import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { authService } from '../services/authService';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const auth = await authService.isAuthenticated();
    setIsAuthenticated(auth);
  };

  const formatPrice = (price) => {
    if (parseFloat(price) === 0) {
      return 'Bağış';
    }
    return `${parseFloat(price).toFixed(2)} TL`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: product.image_url }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.category}>
            {product.category_icon} {product.category_name}
          </Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          
          {product.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>Açıklama:</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          )}

          {isAuthenticated ? (
            <View style={styles.contactContainer}>
              <Text style={styles.contactLabel}>İletişim Bilgileri:</Text>
              <Text style={styles.contactInfo}>Kullanıcı: {product.username}</Text>
              <Text style={styles.contactInfo}>Email: {product.email}</Text>
            </View>
          ) : (
            <View style={styles.authRequiredContainer}>
              <Text style={styles.authRequiredText}>
                İletişim bilgilerini görmek için giriş yapmalısınız.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  contactContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  contactInfo: {
    fontSize: 15,
    color: '#666',
    marginBottom: 5,
  },
  authRequiredContainer: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  authRequiredText: {
    fontSize: 15,
    color: '#856404',
    textAlign: 'center',
  },
});

export default ProductDetailScreen;
