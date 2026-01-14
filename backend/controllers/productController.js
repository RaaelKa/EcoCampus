const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Ürün listeleme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı.' });
    }

    res.json(product);
  } catch (error) {
    console.error('Ürün detay hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.findByUserId(userId);
    res.json(products);
  } catch (error) {
    console.error('Kullanıcı ürünleri hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, price, description, image_url, category_id } = req.body;

    if (!title || price === undefined || !category_id || !image_url) {
      return res.status(400).json({ error: 'Başlık, fiyat, kategori ve resim URL zorunludur.' });
    }

    const productData = {
      title,
      price: parseFloat(price),
      description: description || '',
      image_url,
      user_id: req.user.id,
      category_id
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error('Ürün oluşturma hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description, image_url, category_id } = req.body;

    if (!title || price === undefined || !category_id || !image_url) {
      return res.status(400).json({ error: 'Başlık, fiyat, kategori ve resim URL zorunludur.' });
    }

    const productData = {
      title,
      price: parseFloat(price),
      description: description || '',
      image_url,
      category_id
    };

    const product = await Product.update(id, productData, req.user.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı veya yetkiniz yok.' });
    }

    res.json(product);
  } catch (error) {
    console.error('Ürün güncelleme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.delete(id, req.user.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı veya yetkiniz yok.' });
    }

    res.json({ message: 'Ürün başarıyla silindi.', product });
  } catch (error) {
    console.error('Ürün silme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getUserProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
