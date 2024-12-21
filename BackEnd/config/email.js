const nodemailer = require('nodemailer');

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1ee9d533d4eabc",
      pass: "5dc5c422100a93"
    }
  });

module.exports = transport;
