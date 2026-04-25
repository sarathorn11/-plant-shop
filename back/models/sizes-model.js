module.exports = (sequelize, DataTypes) => {
  const Size = sequelize.define(
  "Size",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  { tableName: "sizes" }
);

  return Size;
};
