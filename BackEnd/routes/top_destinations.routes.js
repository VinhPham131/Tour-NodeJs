const express = require('express');
const router = express.Router();

const {
    getAllTopDestinations,
    addTopDestination,
    updateBookCount,
    deleteTopDestination,
} = require('../controllers/top_destinations.controller');

router 
    .route('/')
    .get(getAllTopDestinations)
    .post(addTopDestination);

router
    .route('/:id')
    .put(updateBookCount)
    .delete(deleteTopDestination);

module.exports = router;