module.exports = (sequelize, DataTypes) => {
  const PlantLifeStyle = sequelize.define(
  "PlantLifeStyle",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "plant_life_styles" }
);

  return PlantLifeStyle;
};
