module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
  "Image",
  {
    name: {
      type: DataTypes.STRING,
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
  },
  { tableName: "images" }
);

  return Image;
};
