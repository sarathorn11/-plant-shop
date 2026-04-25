module.exports = (sequelize, DataTypes) => {
  const PlantTypeProduct = sequelize.define(
  "PlantTypeProduct",
  {
    product_id: {
      type: DataTypes.INTEGER,
    },
    plant_type_id: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "plant_type_products" }
);

  return PlantTypeProduct;
};
