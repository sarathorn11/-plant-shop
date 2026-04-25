module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    care_id: {
      type: DataTypes.INTEGER
    },
    light_id: {
      type: DataTypes.INTEGER
    }
  },
  { tableName: "products" }
);

  return Product;
};
