module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      type: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        // allowNull: false
      },
    },
    { tableName: "categories" }
  );

  return Category;
};
