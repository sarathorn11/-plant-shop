const { Order } = require('../models');

// Get all active orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, paymentStatus, paymentMethod } = req.body;
    
    // Generate simple order number (e.g. ORD-TIMESTAMP)
    const orderNumber = `ORD-${Date.now()}`;

    const order = await Order.create({
      orderNumber,
      items,
      totalPrice,
      paymentStatus: paymentStatus || 'pending',
      paymentMethod,
      cashierId: req.user ? req.user.id : null,
      status: 'pending'
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update({ status });
    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get order history for logged-in cashier with pagination
exports.getOrderHistory = async (req, res) => {
  try {
    const cashierId = req.user ? req.user.id : null;
    if (!cashierId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const { page: queryPage, limit: queryLimit, startDate, endDate } = req.query;
    const page = parseInt(queryPage) || 1;
    const limit = parseInt(queryLimit) || 10;
    const offset = (page - 1) * limit;
    
    const whereClause = { cashierId };
    
    if (startDate || endDate) {
      const { Op } = require('sequelize');
      const start = startDate ? new Date(startDate) : new Date(0);
      if (startDate) start.setHours(0, 0, 0, 0);
      
      const end = endDate ? new Date(endDate) : new Date();
      if (endDate) end.setHours(23, 59, 59, 999);
      
      whereClause.createdAt = {
        [Op.between]: [start, end]
      };
    }

    const { count, rows: orders } = await Order.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });
    
    const totalPages = Math.ceil(count / limit);
    res.json({
      totalItems: count,
      totalPages,
      currentPage: page,
      orders,
    });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
