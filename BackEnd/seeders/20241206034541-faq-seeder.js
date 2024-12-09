'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Faqs', [
      {
        id: 1,
        title: 'How do I book a tour?',
        description: 'You can book a tour by visiting our website, selecting your desired tour, choosing the date, and completing the booking process by making payment. For assistance, contact our customer support team.\n\n',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Can I cancel or reschedule my booking?',
        description: 'Yes, cancellations and rescheduling are possible, but they are subject to our cancellation policy. Please check the specific terms for your booking or contact us for more details.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: 'Are there any discounts for group bookings?',
        description: 'We offer special discounts for group bookings. Please reach out to us with your group size and requirements, and we’ll provide you with a customized quote.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        title: 'What’s included in the tour package?',
        description: 'The inclusions vary by tour. Typically, our packages include transportation, guided tours, and any mentioned meals or activities. Please refer to the specific tour details for exact inclusions.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        title: 'Do I need travel insurance for the tour?',
        description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Faqs', null, {});
  }
};