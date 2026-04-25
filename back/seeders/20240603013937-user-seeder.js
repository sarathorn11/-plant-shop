"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Admin",
          email: "admin@example.com",
          password:
            "$2a$10$Al7p3plrWv/16dJ4xG2eseIoEGoIj5.rGyV/87LH7CGuTb9SYzeIC",
          role: "admin",
          profile: "avatar.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Customer",
          email: "customer@example.com",
          password:
            "$2a$10$Al7p3plrWv/16dJ4xG2eseIoEGoIj5.rGyV/87LH7CGuTb9SYzeIC",
          role: "customer",
          profile: "avatar.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
