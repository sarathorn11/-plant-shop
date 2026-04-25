const { Sequelize } = require("sequelize");

// Define models and their corresponding definitions
const models = [
  { modelName: 'Care', defineModel: require('./cares-model') },
  { modelName: 'User', defineModel: require('./users-model') },
  { modelName: 'Product', defineModel: require('./products-model') },
  // Add more models here if needed
];

// Initialize an empty object to store the defined models
const definedModels = {};

// Loop through each model definition and define the model using Sequelize
for (const { modelName, defineModel } of models) {
  definedModels[modelName] = defineModel(sequelize, Sequelize.DataTypes);
}

// Destructure the defined models for easier access
const { Care, User, Product } = definedModels;

// Export the defined models
export default  {
  Care,
  User,
  Product,
  // Add more models here if needed
};
