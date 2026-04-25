const Sequelize = require("sequelize");
const db = require('../config/database');

const PlantGiftProduct = db.define(
  "PlantGiftProduct",
  {
    product_id: {
      type: Sequelize.INTEGER,
    },
    plant_gift_id: {
      type: Sequelize.INTEGER,
    },
  },
  { tableName: "plant_gift_product" }
);

module.exports = PlantGiftProduct;

module.exports = (sequelize, DataTypes) => {
  const PlantGiftProduct = sequelize.define(
  "PlantGiftProduct",
  {
    product_id: {
      type: DataTypes.INTEGER,
    },
    plant_gift_id: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "plant_gift_products" }
);

  return PlantGiftProduct;
};
