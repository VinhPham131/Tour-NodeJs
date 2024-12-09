'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      sale_off: {
        type: Sequelize.INTEGER
      },
      place: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.DECIMAL
      },
      region: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.DECIMAL
      },
      reviews_count: {
        type: Sequelize.INTEGER
      },
      arrive_day: {
        type: Sequelize.DATE
      },
      depart_day: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      group_size: {
        type: Sequelize.INTEGER
      },
      language: {
        type: Sequelize.STRING
      },
      thumbnails: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tours');
  }
};