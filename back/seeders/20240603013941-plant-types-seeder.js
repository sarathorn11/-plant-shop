"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "plant_types",
      [
        {
          name: "SUCCULENTS PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "MEDICINE PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "TROPICAL PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "FLOWERING PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "RARE PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "OUTDOOR PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HOUSE PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HANGING PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "FRUIT PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BONSAI PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "FLOOR PLANTS",
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
    await queryInterface.bulkDelete("plant_types", null, {});
  },
};
