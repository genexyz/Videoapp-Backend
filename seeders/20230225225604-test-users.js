"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password1$", salt);
    const hashedPassword2 = await bcrypt.hash("password2$", salt);

    await queryInterface.bulkInsert("users", [
      {
        id: "3a29bc94-a4ad-4510-bb87-cd80c48eafa3",
        email: "user1@example.com",
        password: hashedPassword,
        name: "User One",
        bio: "I am user number one",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3237/3237472.png",
        role: "student",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a595a2ae-75db-40ed-acca-2cf484912cd2",
        email: "user2@example.com",
        password: hashedPassword2,
        name: "User Two",
        bio: "I am user number two",
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3237/3237472.png",
        role: "teacher",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
