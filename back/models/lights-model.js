module.exports = (sequelize, DataTypes) => {
  const Light = sequelize.define(
  "Light",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "lights" }
);

  return Light;
};
