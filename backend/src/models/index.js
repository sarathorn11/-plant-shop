const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const Setting = require('./Setting');

// Order - User Relationship (Cashier)
Order.belongsTo(User, { as: 'Cashier', foreignKey: 'cashierId' });
User.hasMany(Order, { foreignKey: 'cashierId' });

module.exports = {
  sequelize,
  User,
  Product,
  Order,
  Setting
};
