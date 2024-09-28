'use strict';

const { reviewImages } = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert("reviewImages",[
      {
        reviewId:1,
        url: "image-for-review-1"
      },
      {
        reviewId:2,
        url: "image-for-review-2"
      },
      {
        reviewId:3,
        url: "image-for-review-3"
      },
      {
        reviewId:4,
        url: "image-for-review-4"
      },
      {
        reviewId:5,
        url: "image-for-review-5"
      },
      {
        reviewId:6,
        url: "image-for-review-6"
      }
    ],{})

  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'reviewImages';
    // const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null,{});

  }
};
