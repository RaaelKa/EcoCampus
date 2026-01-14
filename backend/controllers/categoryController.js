const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Kategori listeleme hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({ error: 'Kategori bulunamadı.' });
    }

    res.json(category);
  } catch (error) {
    console.error('Kategori detay hatası:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById
};
