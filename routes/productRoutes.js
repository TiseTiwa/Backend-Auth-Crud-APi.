const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { permit } = require('../middleware/roles');
const productController = require('../controllers/productController');

const router = express.Router();

// Public
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);

// Admin protected
router.post('/', authMiddleware, permit('admin'), productController.createProduct);
router.put('/:id', authMiddleware, permit('admin'), productController.updateProduct);
router.delete('/:id', authMiddleware, permit('admin'), productController.deleteProduct);

module.exports = router;
