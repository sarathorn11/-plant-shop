module.exports = (sequelize, DataTypes) => {
  const PlantGift = sequelize.define(
  "PlantGift",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "plant_gifts" }
);

  return PlantGift;
};
