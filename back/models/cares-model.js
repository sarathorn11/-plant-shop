module.exports = (sequelize, DataTypes) => {
  const Care = sequelize.define(
  "Care",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "cares" }
);

  return Care;
};
