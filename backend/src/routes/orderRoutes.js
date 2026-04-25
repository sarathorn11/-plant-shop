const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, hasPermission } = require('../middleware/auth');

// Get orders (Visible to everyone with a role)
router.get('/', verifyToken, orderController.getOrders);

// Create order (Cashier, Admin)
router.post('/', verifyToken, hasPermission(['create_order']), orderController.createOrder);

// Update order status (Barista, Admin)
router.put('/:id/status', verifyToken, hasPermission(['update_order_status']), orderController.updateOrderStatus);

router.get('/history', verifyToken, hasPermission(['view_orders']), orderController.getOrderHistory);
module.exports = router;
