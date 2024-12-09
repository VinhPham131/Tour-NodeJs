const express = require('express');
const router = express.Router();

const {
    getAllFaq,
    addFaq,
    updateFaq,
    deleteFaq,
} = require('../controllers/faq.controller');

router
    .route('/')
    .get(getAllFaq)
    .post(addFaq);

router
    .route('/:id')
    .put(updateFaq)
    .delete(deleteFaq);

module.exports = router;
