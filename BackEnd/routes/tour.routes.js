const express = require('express');
const router = express.Router();

const {
    getTours,
    addTour,
    updateTour,
    deleteTour,
    getToursById
} = require('../controllers/tour.controller');

router
    .route('/')
    .post(addTour)
    .get(getTours);


router
    .route('/:id')
    .put(updateTour)
    .delete(deleteTour)
    .get(getToursById);

module.exports = router;
