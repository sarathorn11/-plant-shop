module.exports = (sequelize, DataTypes) => {
  const ProductLight = sequelize.define(
  "ProductLight",
  {
    product_id: {
      type: DataTypes.INTEGER,
    },
    light_id: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "product_lights" }
);

  return ProductLight;
};
