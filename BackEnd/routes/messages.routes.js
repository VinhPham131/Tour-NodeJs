const express = require('express');
const router = express.Router();

const {
    createMessage,
    getMessages
} = require('../controllers/messages.controller');

router
    .route('/')
    .get(getMessages)
    .post(createMessage);

module.exports = router;