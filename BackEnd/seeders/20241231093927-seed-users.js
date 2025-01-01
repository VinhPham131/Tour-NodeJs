'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);

      await queryInterface.bulkInsert('Users', [
        {
          email: 'admin@example.com',
          password: hashedPassword,
          name: 'Admin',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};