import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// NOT: Expo kullanırken localhost yerine bilgisayarınızın IP adresini kullanın
// Örnek: 'http://192.168.1.100:3000/api'
// IP adresinizi öğrenmek için: Windows'ta ipconfig, Mac/Linux'ta ifconfig komutunu kullanın
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token'ı otomatik olarak header'a ekle
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
