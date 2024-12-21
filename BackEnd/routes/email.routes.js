// routes/emailRoutes.js
const express = require('express');
const { sendEmail } = require('../services/emailService');

const router = express.Router();

router.post('/send-test-email', async (req, res) => {
  try {
    await sendEmail(
      req.body.to,
      'Test Email',
      'This is a test email from Mailtrap',
      '<p>This is a <b>test</b> email from Mailtrap</p>'
    );
    res.status(200).send('Test email sent!');
  } catch (error) {
    res.status(500).send('Failed to send test email');
  }
});

module.exports = router;
