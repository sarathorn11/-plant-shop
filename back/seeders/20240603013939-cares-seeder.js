"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cares",
      [
        {
          name: "EASY",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "MODERATE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ADVANCE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cares", null, {});
  },
};
