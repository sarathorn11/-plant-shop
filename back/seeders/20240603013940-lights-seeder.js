"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "lights",
      [
        {
          name: "LOW LIGHT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "DIRECT LIGHT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "INDIRECT LIGHT",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("lights", null, {});
  },
};
