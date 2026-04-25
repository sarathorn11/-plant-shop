module.exports = (sequelize, DataTypes) => {
  const PlantLifeStyleProduct = sequelize.define(
  "PlantLifeStyleProduct",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    plant_life_style_id: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "plant_life_style_products" }
);

  return PlantLifeStyleProduct;
};
