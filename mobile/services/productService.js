import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const productService = {
  async getAllProducts() {
    const response = await api.get('/products');
    return response.data;
  },

  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async createProduct(productData) {
    const headers = await getAuthHeaders();
    const response = await api.post('/products', productData, { headers });
    return response.data;
  }
};
