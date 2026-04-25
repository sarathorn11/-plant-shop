"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "sizes",
      [
        {
          name: "SMALL",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "MEDIUM",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "LARGE",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("sizes", null, {});
  },
};
