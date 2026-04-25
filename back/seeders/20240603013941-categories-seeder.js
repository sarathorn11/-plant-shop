"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          type: "PLANT TYPES",
          name: "SUCCULENTS PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT TYPES",
          name: "MEDICINE PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT TYPES",
          name: "TROPICAL PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT TYPES",
          name: "FLOWERING PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT TYPES",
          name: "RARE PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT TYPES",
          name: "OUTDOOR PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT TYPES",
          name: "HOUSE PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT TYPES",
          name: "HANGING PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT TYPES",
          name: "FRUIT PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT TYPES",
          name: "BONSAI PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT TYPES",
          name: "FLOOR PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT TYPES",
          name: "FARM PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT LIFE STYLES",
          name: "FENG SHUI PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT LIFE STYLES",
          name: "ZODIAC PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT LIFE STYLES",
          name: "AIR PURIFYING PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT LIFE STYLES",
          name: "PLANTS FOR BEGINNERS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT LIFE STYLES",
          name: "FLOWERING PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT LIFE STYLES",
          name: "FRUIT PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT LIFE STYLES",
          name: "FARM PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT GIFTS",
          name: "BIRTHDAY COLLECTION",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT GIFTS",
          name: "FRIENDSHIP DAY GIFTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT GIFTS",
          name: "CORPORATE GIFTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT GIFTS",
          name: "BACK TO SCHOOL GIFTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT GIFTS",
          name: "SYMPATHY PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT GIFTS",
          name: "GIFTS FOR PARENTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT GIFTS",
          name: "HOUSEWARMING COLLECTION",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT GIFTS",
          name: "GRANDPARENTS DAY GIFTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "PLANT GIFTS",
          name: "THANK YOU COLLECTION",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
