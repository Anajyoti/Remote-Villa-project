'use strict';

const { SpotImages } = require('../models');
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImages.bulkCreate([
      {
        spotId: 1,
        url: "/preview1.jpeg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: "/preview2.jpeg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: "/preview3.jpeg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        url: "/preview4.jpeg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: "/preview5.jpeg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
       },
      {
        spotId: 6,
        url: "/preview6.jpeg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // {
      //   spotId: 7,
      //   url: "/images/07.png",
      //   preview: false,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 8,
      //   url: "/images/08.png",
      //   preview: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 9,
      //   url: "/images/09.png",
      //   preview: false,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 10,
      //   url: "/images/10.png",
      //   preview: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 11,
      //   url: "/images/011.png",
      //   preview: false,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 12,
      //   url: "/images/012.png",
      //   preview: false,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 13,
      //   url: "/images/013.png",
      //   preview: false,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 14,
      //   url: "/images/014.png",
      //   preview: false,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 15,
      //   url: "/images/015.png",
      //   preview: false,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 16,
      //   url: "/images/016.png",
      //   preview: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 17,
      //   url: "/images/017.png",
      //   preview: false,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 18,
      //   url: "/images/018.png",
      //   preview: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 19,
      //   url: "/images/019.png",
      //   preview: false,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // },
      // {
      //   spotId: 20,
      //   url: "/images/20.png",
      //   preview: true,
      //   createdAt: new Date(),
      //   updatedAt: new Date()
      // }
      {spotId:1, url: '/detail1.jpeg', preview: false},
      {spotId:1, url: '/detail2.jpeg', preview: false},
      {spotId:1, url: '/detail3.jpeg', preview: false},
      {spotId:1, url: '/detail4.jpeg', preview: false},

      {spotId:2, url: '/detail1.jpeg', preview: false},
      {spotId:2, url: '/detail2.jpeg', preview: false},
      {spotId:2, url: '/detail3.jpeg', preview: false},
      {spotId:2, url: '/detail4.jpeg', preview: false},

      {spotId:3, url: '/detail1.jpeg', preview: false},
      {spotId:3, url: '/detail2.jpeg', preview: false},
      {spotId:3, url: '/detail3.jpeg', preview: false},
      {spotId:3, url: '/detail4.jpeg', preview: false},

      {spotId:4, url: '/detail1.jpeg', preview: false},
      {spotId:4, url: '/detail2.jpeg', preview: false},
      {spotId:4, url: '/detail3.jpeg', preview: false},
      {spotId:4, url: '/detail4.jpeg', preview: false},

    ],{validate: true});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5,6,7,8,9,10] }
});
  }
};
