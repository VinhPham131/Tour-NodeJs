const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/index');
const session = require('express-session'); // Add express-session

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // Your frontend URL
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Use a secret key for encryption
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true, // To make the cookie not accessible via JavaScript
      secure: process.env.NODE_ENV === 'production', // Set to true in production to ensure cookies are only sent over HTTPS
      maxAge: 60 * 60 * 1000, // Cookie expiry (1 hour)
    },
  })
);

// Routes
router(app);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
