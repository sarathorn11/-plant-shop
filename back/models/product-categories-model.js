module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    "ProductCategory",
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Product',
        //   key: 'id'
        // }
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'Category',
        //   key: 'id'
        // }
      }
    },
    { tableName: "product_categories" }
  );

  return ProductCategory;
};
