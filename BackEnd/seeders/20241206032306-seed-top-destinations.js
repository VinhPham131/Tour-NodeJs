'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('top_destinations', [
      { id: 1, tour_id: 1, book_count: 4 },
      { id: 2, tour_id: 2, book_count: 5 },
      { id: 4, tour_id: 3, book_count: 10 },
      { id: 5, tour_id: 4, book_count: 10 },
      { id: 6, tour_id: 5, book_count: 10 },
      { id: 7, tour_id: 6, book_count: 10 },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('top_destinations', null, {});
  },
};
