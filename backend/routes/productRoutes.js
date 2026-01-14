const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/auth');

// Herkese açık rotalar
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Korumalı rotalar (JWT gerekli)
router.get('/user/my-products', authenticateToken, productController.getUserProducts);
router.post('/', authenticateToken, productController.createProduct);
router.put('/:id', authenticateToken, productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

module.exports = router;
