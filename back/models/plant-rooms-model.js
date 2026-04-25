module.exports = (sequelize, DataTypes) => {
  const PlantRoom = sequelize.define(
  "PlantRoom",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "plant_rooms" }
);

  return PlantRoom;
};
