module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define(
  "ProductSize",
  {
    product_id: {
      type: DataTypes.INTEGER,
    },
    size_id: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "product_sizes" }
);

  return ProductSize;
};
