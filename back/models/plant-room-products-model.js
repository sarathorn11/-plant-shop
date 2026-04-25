module.exports = (sequelize, DataTypes) => {
  const PlantRoomProduct = sequelize.define(
  "PlantRoomProduct",
  {
    product_id: {
      type: DataTypes.INTEGER,
    },
    plant_room_id: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "plant_room_products" }
);

  return PlantRoomProduct;
};
