"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const USER1_ID = "3a29bc94-a4ad-4510-bb87-cd80c48eafa3";
    const USER2_ID = "a595a2ae-75db-40ed-acca-2cf484912cd2";

    const likes = [
      {
        userId: USER1_ID,
        videoId: "f1866f89-83f6-485a-81c3-2333ff7931a9",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: USER1_ID,
        videoId: "695c9751-f3f3-436c-b7bd-a273d4feca0b",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: USER1_ID,
        videoId: "b05fe7cd-4b72-4eec-ad7d-ea94039f1359",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: USER2_ID,
        videoId: "b05fe7cd-4b72-4eec-ad7d-ea94039f1359",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: USER2_ID,
        videoId: "5fccfd66-c149-4ae3-977b-2facfa24af08",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: USER2_ID,
        videoId: "f1866f89-83f6-485a-81c3-2333ff7931a9",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("likes", likes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("likes", null, {});
  },
};
