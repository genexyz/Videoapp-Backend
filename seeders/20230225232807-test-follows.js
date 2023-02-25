"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const USER1_ID = "3a29bc94-a4ad-4510-bb87-cd80c48eafa3";
    const USER2_ID = "a595a2ae-75db-40ed-acca-2cf484912cd2";

    const followers = [
      {
        id: 1,
        followerId: USER1_ID,
        followingId: USER2_ID,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        followerId: USER2_ID,
        followingId: USER1_ID,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("follows", followers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("follows", null, {});
  },
};
