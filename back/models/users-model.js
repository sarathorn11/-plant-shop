// user.js
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
      profile: {
        type: DataTypes.STRING,
      },
    },
    { tableName: 'users' } // Adjust the table name if needed
  );

  // Add lifecycle hook
  User.beforeCreate(async (user, options) => {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    } catch (err) {
      throw new Error('Error hashing password');
    }
  });

  return User;
};

