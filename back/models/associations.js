module.exports = (sequelize, DataTypes, models) => {
  const {
    User,
    Product,
    Care,
    Customer,
    Image,
    Light,
    Size,
    PlantGift,
    PlantType,
    PlantLifeStyle,
    PlantRoom,
    ProductCare,
    ProductLight,
    ProductSize,
    PlantTypeProduct,
    PlantGiftProduct,
    PlantLifeStyleProduct,
    PlantRoomProduct,
    Category,
    ProductCategory,
  } = models;

User.hasOne(Customer, { foreignKey: "user_id" });
Customer.belongsTo(User, { foreignKey: "user_id" });

// Product - Image Association
Product.hasMany(Image, { foreignKey: "product_id", as: "ProductImages" });
Image.belongsTo(Product, { foreignKey: "product_id", as: "ProductImages" });

// Care - ProductCare Association
Care.hasMany(ProductCare, { foreignKey: "care_id" });
ProductCare.belongsTo(Care, { foreignKey: "care_id" });

// Light - ProductLight Association
Light.hasMany(ProductLight, { foreignKey: "light_id" });
ProductLight.belongsTo(Light, { foreignKey: "light_id" });

// Size - ProductSize Association
Size.hasMany(ProductSize, { foreignKey: "size_id", as: "size" });
ProductSize.belongsTo(Size, { foreignKey: "size_id", as: "size" });

// PlantType - PlantTypeProduct Association
PlantType.hasMany(PlantTypeProduct, { foreignKey: "plant_type_id" });
PlantTypeProduct.belongsTo(PlantType, { foreignKey: "plant_type_id" });

// PlantGift - PlantGiftProduct Association
PlantGift.hasMany(PlantGiftProduct, { foreignKey: "plant_gift_id" });
PlantGiftProduct.belongsTo(PlantGift, { foreignKey: "plant_gift_id" });

// PlantLifeStyle - PlantLifeStyleProduct Association
PlantLifeStyle.hasMany(PlantLifeStyleProduct, {
  foreignKey: "plant_life_style_id",
});
PlantLifeStyleProduct.belongsTo(PlantLifeStyle, {
  foreignKey: "plant_life_style_id",
});

// PlantRoom - PlantRoomProduct Association
PlantRoom.hasMany(PlantRoomProduct, { foreignKey: "plant_room_id" });
PlantRoomProduct.belongsTo(PlantRoom, { foreignKey: "plant_room_id" });

// Product - ProductCare Association
Product.hasMany(ProductCare, {
  foreignKey: "product_id",
  as: "ProductCares",
});
ProductCare.belongsTo(Product, {
  foreignKey: "product_id",
  as: "ProductCares",
});

// Product - ProductLight Association
Product.hasMany(ProductLight, {
  foreignKey: "product_id",
  as: "ProductLights",
});
ProductLight.belongsTo(Product, {
  foreignKey: "product_id",
  as: "ProductLights",
});

// Product - ProductSize Association
Product.hasMany(ProductSize, {
  foreignKey: "product_id",
  as: "ProductSizes",
});
ProductSize.belongsTo(Product, {
  foreignKey: "product_id",
  as: "ProductSizes",
});

// Product - PlantTypeProduct Association
Product.hasMany(PlantTypeProduct, {
  foreignKey: "product_id",
  as: "PlantTypes",
});
PlantTypeProduct.belongsTo(Product, {
  foreignKey: "product_id",
  as: "PlantTypes",
});

// Product - PlantGiftProduct Association
Product.hasMany(PlantGiftProduct, {
  foreignKey: "product_id",
  as: "PlantGifts",
});
PlantGiftProduct.belongsTo(Product, {
  foreignKey: "product_id",
  as: "PlantGifts",
});

// Product - PlantLifeStyleProduct Association
Product.hasMany(PlantLifeStyleProduct, {
  foreignKey: "product_id",
  as: "PlantLifeStyles",
});
PlantLifeStyleProduct.belongsTo(Product, {
  foreignKey: "product_id",
  as: "PlantLifeStyles",
});

// Product - ProductCategory Association
Product.hasMany(ProductCategory, {
  foreignKey: "product_id",
  as: "ProductCategories",
});
ProductCategory.belongsTo(Product, {
  foreignKey: "product_id",
  as: "ProductCategories",
});
// Category - ProductCategory Association
Category.hasMany(ProductCategory, {
  foreignKey: "category_id",
});
ProductCategory.belongsTo(Category, {
  foreignKey: "category_id",
});

// Product - Care Association
Care.hasMany(Product, { foreignKey: "care_id" });
Product.belongsTo(Care, { foreignKey: "care_id" });

// Product - Light Association
Light.hasMany(Product, { foreignKey: "light_id" });
Product.belongsTo(Light, { foreignKey: "light_id" });

// Product - PlantRoomProduct Association
Product.hasMany(PlantRoomProduct, { foreignKey: "product_id" });
PlantRoomProduct.belongsTo(Product, { foreignKey: "product_id" });
};
