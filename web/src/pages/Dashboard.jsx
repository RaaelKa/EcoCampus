import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import './Dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image_url: '',
    category_id: ''
  });
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productService.getUserProducts(),
        categoryService.getAllCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Veriler yüklenirken hata oluştu.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description || '',
      image_url: product.image_url,
      category_id: product.category_id
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      await productService.deleteProduct(id);
      await loadData();
    } catch (err) {
      alert('İlan silinirken hata oluştu.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, formData);
      } else {
        await productService.createProduct(formData);
      }
      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        title: '',
        price: '',
        description: '',
        image_url: '',
        category_id: ''
      });
      await loadData();
    } catch (err) {
      alert(err.response?.data?.error || 'İşlem başarısız.');
    }
  };

  const formatPrice = (price) => {
    if (parseFloat(price) === 0) {
      return 'Bağış';
    }
    return `${parseFloat(price).toFixed(2)} TL`;
  };

  if (loading) {
    return <div className="dashboard-container"><div className="loading">Yükleniyor...</div></div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>EcoCampus Dashboard</h1>
        <div className="user-info">
          <span>Hoş geldiniz, {user?.username}</span>
          <button onClick={handleLogout} className="btn-logout">Çıkış Yap</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-actions">
          <button onClick={() => { setShowForm(true); setEditingProduct(null); setFormData({ title: '', price: '', description: '', image_url: '', category_id: '' }); }} className="btn-add">
            + Yeni İlan Ekle
          </button>
        </div>

        {showForm && (
          <div className="product-form-modal">
            <div className="product-form">
              <h2>{editingProduct ? 'İlanı Düzenle' : 'Yeni İlan Ekle'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Başlık *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Fiyat (TL) * (0 = Bağış)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Kategori *</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    required
                  >
                    <option value="">Seçiniz</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Resim URL *</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Açıklama</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="4"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary">Kaydet</button>
                  <button type="button" onClick={() => { setShowForm(false); setEditingProduct(null); }} className="btn-secondary">İptal</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <div className="products-grid">
          {products.length === 0 ? (
            <div className="empty-state">Henüz ilanınız bulunmamaktadır.</div>
          ) : (
            products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image_url} alt={product.title} className="product-image" />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p className="product-category">{product.category_icon} {product.category_name}</p>
                  <p className="product-price">{formatPrice(product.price)}</p>
                  {product.description && <p className="product-description">{product.description}</p>}
                  <div className="product-actions">
                    <button onClick={() => handleEdit(product)} className="btn-edit">Düzenle</button>
                    <button onClick={() => handleDelete(product.id)} className="btn-delete">Sil</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
