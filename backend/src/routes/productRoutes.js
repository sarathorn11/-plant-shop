const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, hasPermission } = require('../middleware/auth');

// Public or low access (assuming cashiers and baristas can view menu)
// In a real POS, perhaps only auth users can see the menu
router.get('/', verifyToken, productController.getProducts);

// Highly restricted operations (e.g. Admin or InventoryManager)
router.post('/', verifyToken, hasPermission(['manage_menu', 'add_stock']), productController.createProduct);
router.put('/:id', verifyToken, hasPermission(['manage_menu', 'add_stock']), productController.updateProduct);
router.delete('/:id', verifyToken, hasPermission(['manage_menu']), productController.deleteProduct);

module.exports = router;
