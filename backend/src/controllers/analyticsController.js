const { Op } = require('sequelize');
const { Order } = require('../models');

exports.getAnalyticsSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = startDate ? new Date(startDate) : new Date();
    if (!startDate) start.setDate(start.getDate() - 7);
    start.setHours(0, 0, 0, 0);

    const end = endDate ? new Date(endDate) : new Date();
    end.setHours(23, 59, 59, 999);

    const whereClause = {
      createdAt: {
        [Op.between]: [start, end]
      },
      status: {
        [Op.ne]: 'cancelled'
      }
    };

    const orders = await Order.findAll({
      where: whereClause,
      attributes: ['id', 'totalPrice', 'createdAt', 'items']
    });

    let totalRevenue = 0;
    const itemsCountMap = {};
    const dailyRevenueMap = {};

    // Initialize daily map with 0 for all dates in range to show a complete line chart
    let currentDate = new Date(start);
    while (currentDate <= end) {
      dailyRevenueMap[currentDate.toISOString().split('T')[0]] = 0;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    orders.forEach(order => {
      // Aggregate Revenue
      const price = parseFloat(order.totalPrice || 0);
      totalRevenue += price;

      // Group by Date for charting
      const dateStr = order.createdAt.toISOString().split('T')[0];
      if (dailyRevenueMap[dateStr] !== undefined) {
          dailyRevenueMap[dateStr] += price;
      }

      // Aggregate Items
      if (Array.isArray(order.items)) {
        order.items.forEach(item => {
          if (!itemsCountMap[item.name]) {
            itemsCountMap[item.name] = { name: item.name, quantity: 0, revenue: 0 };
          }
          itemsCountMap[item.name].quantity += item.qty;
          itemsCountMap[item.name].revenue += item.price * item.qty;
        });
      }
    });

    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;

    // Convert daily revenue map to array
    const revenueOverTime = Object.keys(dailyRevenueMap)
      .sort((a, b) => new Date(a) - new Date(b))
      .map(date => ({
        date,
        revenue: parseFloat(dailyRevenueMap[date].toFixed(2))
      }));

    // Convert items map to sorted array
    const topItems = Object.values(itemsCountMap)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    res.json({
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalOrders,
      averageOrderValue: parseFloat(averageOrderValue.toFixed(2)),
      revenueOverTime,
      topItems
    });
  } catch (error) {
    console.error('Error calculating analytics:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
