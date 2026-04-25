module.exports = (sequelize, DataTypes) => {
  const ProductCare = sequelize.define(
  "ProductCare",
  {
    product_id: {
      type: DataTypes.INTEGER,
    },
    care_id: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "product_cares" }
);

  return ProductCare;
};
