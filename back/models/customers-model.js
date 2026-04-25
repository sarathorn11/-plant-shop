module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
  "Customer",
  {
    user_id: DataTypes.INTEGER,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
  },
  { tableName: "customers" }
);

  return Customer;
};
