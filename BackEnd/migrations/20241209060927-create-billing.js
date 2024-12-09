'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Billings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // table name should match your User table
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      paymentMethod: {
        type: Sequelize.STRING,
      },
      totalCost: {
        type: Sequelize.FLOAT,
      },
      tourTitle: {
        type: Sequelize.STRING,
      },
      tourPlace: {
        type: Sequelize.STRING,
      },
      arrivalDate: {
        type: Sequelize.DATE,
      },
      departureDate: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      children: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      adults: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Billings');
  }
};
