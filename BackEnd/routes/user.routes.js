const express = require('express');
const router = express.Router();
const {authorizeAdmin, authorizeUser, checkAuth} = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadFile');

// User routes
const { 
    createAccount, 
    loginUser,
    getAllUsers,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    updatePassword, 
    deleteAccount,
    uploadAvatar,
    forgotPassword,
    resetPassword
} = require('../controllers/user.controller');

//Admin routes
const {
    deleteUser,
    updateUser,
    createUser,
} = require('../controllers/user.controller');

// Route for user forgot password
// Public Routes (No Auth Required)
router.post('/register', createAccount);     // Register
router.post('/login', loginUser);            // Login
router.post('/forgot-password', forgotPassword); // Forgot password
router.put('/reset-password/:token', resetPassword); // Reset password
router.get('/logout', logoutUser);           // Logout

// User Routes (Require User Role)
router.get('/profile', checkAuth, authorizeUser, getUserProfile); // Get users profile
router.put('/update', checkAuth, authorizeUser, updateUserProfile); // Update user profile
router.put('/update-password', checkAuth, authorizeUser, updatePassword); // Update password
router.delete('/delete', checkAuth, authorizeUser, deleteAccount); // Delete account
router.post('/upload-avatar', checkAuth, authorizeUser, upload.single('avatar'), uploadAvatar); // Upload avatar

// Admin Routes (Require Admin Role)
router.get('/', checkAuth, authorizeAdmin, getAllUsers); // Get list of all users
router.post('/', checkAuth, authorizeAdmin, createUser); // Create new user
router.route('/:id')
    .delete(checkAuth, authorizeAdmin, deleteUser) // Delete user
    .put(checkAuth, authorizeAdmin, updateUser);   // Update user

module.exports = router;
