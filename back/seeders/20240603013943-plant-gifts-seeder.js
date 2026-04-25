"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "plant_gifts",
      [
        {
          name: "BIRTHDAY COLLECTION",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "FRIENDSHIP DAY GIFTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "CORPORATE GIFTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "BACK TO SCHOOL GIFTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "SYMPATHY PLANTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "GIFTS FOR PARENTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HOUSEWARMING COLLECTION",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "GRANDPARENTS DAY GIFTS",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "THANK YOU COLLECTION",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("plant_gifts", null, {});
  },
};
