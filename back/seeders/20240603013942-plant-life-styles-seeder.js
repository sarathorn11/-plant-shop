"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "plant_life_styles",
      [
        {
          name: "FENG SHUI PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ZODIAC PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "AIR PURIFYING PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PLANTS FOR BEGINNERS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "FLOWERING PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "FRUIT PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "FARM PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("plant_life_styles", null, {});
  },
};
