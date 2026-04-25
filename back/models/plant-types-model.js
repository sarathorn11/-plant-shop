module.exports = (sequelize, DataTypes) => {
  const PlantType = sequelize.define(
  "PlantType",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "plant_types" }
);

  return PlantType;
};
