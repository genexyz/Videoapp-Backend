"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("videos", [
      {
        id: "5fccfd66-c149-4ae3-977b-2facfa24af08",
        title: "Ancients Monuments of Egypt",
        description:
          "The stunning sites and monuments of Ancient Egypt, built between 4.6 and 2 thousand years ago.",
        url: "https://www.youtube.com/watch?v=Dtw2vfKihXA",
        thumbnail: "https://i.ytimg.com/vi/Dtw2vfKihXA/hqdefault.jpg",
        published: true,
        publishedAt: new Date(),
        likesAmount: 1,
        userId: "3a29bc94-a4ad-4510-bb87-cd80c48eafa3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b05fe7cd-4b72-4eec-ad7d-ea94039f1359",
        title: "Petra, Jordan [Amazing Places 4K]",
        description:
          "Petra is a historical and archaeological city in the southern Jordanian governorate of Ma'an that is famous for its rock-cut architecture and water conduit system.",
        url: "https://www.youtube.com/watch?v=HCoyRrylVrg",
        thumbnail: "https://i.ytimg.com/vi/HCoyRrylVrg/hqdefault.jpg",
        published: true,
        publishedAt: new Date(),
        likesAmount: 2,
        userId: "3a29bc94-a4ad-4510-bb87-cd80c48eafa3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6fa77e98-d13b-4e52-b0d6-54941ae91cd6",
        title: "Hiking Half Dome, Yosemite National Park, USA [Amazing Places 4K]",
        description:
          "Long day hike to the top of Half Dome, Yosemite National Park, with outstanding views of Vernal and Nevada Falls, Half Dome, Yosemite Valley and the High Sierra.",
        url: "https://www.youtube.com/watch?v=PdCylcA_c40",
        thumbnail: "https://i.ytimg.com/vi/PdCylcA_c40/hqdefault.jpg",
        published: false,
        publishedAt: null,
        likesAmount: 0,
        userId: "3a29bc94-a4ad-4510-bb87-cd80c48eafa3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6d654a73-69f8-4b22-954c-c3ce771e694e",
        title: "Bali, Indonesia [Amazing Places 4K] ",
        description: "The best of the Beautiful Island of Bali, Indonesia.",
        url: "https://www.youtube.com/watch?v=2b9txcAt4e0",
        thumbnail: "https://i.ytimg.com/vi/2b9txcAt4e0/hqdefault.jpg",
        published: true,
        publishedAt: new Date(),
        likesAmount: 0,
        userId: "3a29bc94-a4ad-4510-bb87-cd80c48eafa3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "0a244e1e-d768-4850-aabe-e2cdea50888e",
        title: "Iceland [Amazing Places 4K] ",
        description: "Enjoy the ultimate scenic beauty of Iceland!",
        url: "https://www.youtube.com/watch?v=2h7Dy7O2brs",
        thumbnail: "https://i.ytimg.com/vi/2h7Dy7O2brs/hqdefault.jpg",
        published: true,
        publishedAt: new Date(),
        likesAmount: 0,
        userId: "3a29bc94-a4ad-4510-bb87-cd80c48eafa3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "e2a37a49-c15f-4e62-a776-c0842d3f173f",
        title: "Machu Picchu, Peru [Amazing Places 4K] ",
        description:
          "Machu Picchu: the famous Inca city, lost in the Andes for centuries. Views of the ruins and the surrounding mountains, and distant views from the Sun Gate and Machu Picchu Mountain.",
        url: "https://www.youtube.com/watch?v=lNIEZ61PyG0",
        thumbnail: "https://i.ytimg.com/vi/lNIEZ61PyG0/hqdefault.jpg",
        published: true,
        publishedAt: new Date(),
        likesAmount: 0,
        userId: "a595a2ae-75db-40ed-acca-2cf484912cd2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9fc90d22-ed7c-4fb2-92f6-f35baf6e216c",
        title: "New Zealand [Amazing Places 4K] ",
        description: "Enjoy the ultimate scenic beauty of New Zealand...",
        url: "https://www.youtube.com/watch?v=8jypK2U1AM0",
        thumbnail: "https://i.ytimg.com/vi/8jypK2U1AM0/hqdefault.jpg",
        published: false,
        publishedAt: null,
        likesAmount: 0,
        userId: "a595a2ae-75db-40ed-acca-2cf484912cd2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "695c9751-f3f3-436c-b7bd-a273d4feca0b",
        title:
          "Avatar Mountain & Wulingyuan Scenic Area, Zhangjiajie, China [Amazing Places 4K]",
        description:
          "One of the most stunning and beautiful places in the world, the Wulingyuan Scenic Area in China's Hunan Province has more than 3,000 sandstone pillars and peaks, some higher than 200 meters/660 feet. Its amazing views became inspiration for the Avatar movie and it is on the list of the UNESCO World Heritage Sites. ",
        url: "https://www.youtube.com/watch?v=NUlyJT3RxQA",
        thumbnail: "https://i.ytimg.com/vi/NUlyJT3RxQA/hqdefault.jpg",
        published: true,
        publishedAt: new Date(),
        likesAmount: 1,
        userId: "a595a2ae-75db-40ed-acca-2cf484912cd2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f1866f89-83f6-485a-81c3-2333ff7931a9",
        title: "Yellowstone National Park, USA [Amazing Places 4K]",
        description:
          "Yellowstone National Park is a national park located in the western United States, largely in the state of Wyoming, although it also extends into Montana and Idaho. It was established by the U.S. Congress and signed into law by President Ulysses S. Grant on March 1, 1872. Yellowstone was the first national park in the U.S. and is widely held to be the first national park in the world. The park is known for its wildlife and its many geothermal features, especially Old Faithful Geyser, one of its most popular features. It has many types of ecosystems, but the subalpine forest is the most abundant. It is part of the South Central Rockies forests ecoregion.",
        url: "https://www.youtube.com/watch?v=2QtdEq2tsh8",
        thumbnail: "https://i.ytimg.com/vi/2QtdEq2tsh8/hqdefault.jpg",
        published: true,
        publishedAt: new Date(),
        likesAmount: 2,
        userId: "a595a2ae-75db-40ed-acca-2cf484912cd2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("videos", null, {});
  },
};
