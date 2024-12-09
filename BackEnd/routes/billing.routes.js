const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/authMiddleware');

// Protect the route
const {
    createBilling,
    getAllBillings,
    getBillingByUser
} = require('../controllers/billing.controller');

router.post('/billing', checkAuth, createBilling);
router.get('/', getAllBillings);
router.get('/user', checkAuth, getBillingByUser);

module.exports = router;
