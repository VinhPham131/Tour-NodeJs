const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/authMiddleware'); // Import the correct path for your middleware

const { 
    createUser, 
    loginUser,
    getAllUsers,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    updatePassword, 
    deleteAccount
} = require('../controllers/user.controller');

// Route for user logout
router.get('/logout', logoutUser);

// Route for user registration
router.post('/register', createUser);

// Route for user login
router.post('/login', loginUser);

// Protected route for getting profile, requires authentication
router.get('/profile', checkAuth, getUserProfile);

// Route for getting all users
router.get('/', getAllUsers);

router.put('/update', checkAuth, updateUserProfile);

router.put('/update-password', checkAuth, updatePassword);

router.delete('/delete', checkAuth, deleteAccount);

module.exports = router;
