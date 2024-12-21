const transport = require('../config/email');

const sendEmail = async (to, subject, text, html) => {
  try {
    await transport.sendMail({
      from: '"Tripster Booking Tours" <no-reply@triptser.com>',
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

module.exports = { sendEmail };
