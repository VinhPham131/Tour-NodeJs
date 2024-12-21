const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/authMiddleware'); // Import the correct path for your middleware
const upload = require('../middlewares/uploadFile'); // Import the correct path for your middleware 
const { 
    createAccount, 
    loginUser,
    getAllUsers,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    updatePassword, 
    deleteAccount,
    uploadAvatar
} = require('../controllers/user.controller');



// Route for user logout
router.get('/logout', logoutUser);

// Route for user registration
router.post('/register', createAccount);

// Route for user login
router.post('/login', loginUser);

// Protected route for getting profile, requires authentication
router.get('/profile', checkAuth, getUserProfile);

// Route for getting all users
router.get('/', getAllUsers);

router.put('/update', checkAuth, updateUserProfile);

router.put('/update-password', checkAuth, updatePassword);

router.delete('/delete', checkAuth, deleteAccount);

router.post('/upload-avatar', checkAuth, upload.single('avatar'), uploadAvatar);

//Admin routes
const {
    deleteUser,
    updateUser,
    createUser,
} = require('../controllers/user.controller');

router
    .route('/:id')
    .delete(deleteUser)
    .put(updateUser);

router.post('/', createUser);


module.exports = router;
