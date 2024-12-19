const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');



const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Password validation regex pattern
const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Email validation regex pattern (additional check for a valid email)
const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

exports.createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check for valid email format
    if (!emailValidation.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    // Password validation
    if (!passwordValidation.test(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.',
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: name || null,
      role: role || 'user', // Default role is 'user'
    });

    res.status(201).json({
      message: 'User successfully registered.',
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user.', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Invalid email or password.' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Token expiration logic based on rememberMe
    const tokenOptions = rememberMe
      ? {} // No expiration for "Remember Me"
      : { expiresIn: '1h' }; // 1 hour expiration by default

    // Create a JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        occupation: user.occupation,
        description: user.description,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
        social: user.social,
      },
      JWT_SECRET_KEY,
      tokenOptions
    );

    res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        occupation: user.occupation,
        description: user.description,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
        social: user.social,
      },
      token,  // Send the JWT token in the response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in.', error: error.message });
  }
};


exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out.' });
    }
    res.status(200).json({ message: 'Logged out successfully.' });
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting users.', error: error.message });
  }
}

exports.getUserProfile = async (req, res) => {
  try {
    // Retrieve user ID from decoded JWT (from req.user, set by checkAuth middleware)
    const { id: userId } = req.user;

    // Find the user by the ID
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'role', 'name', 'occupation', 'description', 'phoneNumber', 'social', 'avatar'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user profile data
    res.status(200).json({
      message: 'Welcome to your profile',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        occupation: user.occupation,
        description: user.description,
        phoneNumber: user.phoneNumber,
        social: user.social,
        avatar: user.avatar,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Update user profile
exports.updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email, occupation, description, phoneNumber, social, avatar } =
    req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.occupation = occupation ?? user.occupation;
    user.description = description ?? user.description;
    user.phoneNumber = phoneNumber ?? user.phoneNumber;
    user.social = social ?? user.social;
    user.avatar = avatar ?? user.avatar;

    await user.save();

    // Optionally refresh the token if relevant fields are updated
    const updatedToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        occupation: user.occupation,
        description: user.description,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
        social: user.social,
      },
      JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user,
      token: updatedToken,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile.' });
  }
};

// Update user password
exports.updatePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Verify the current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect current password.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update password.' });
  }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    await user.destroy();

    res.status(200).json({ message: 'Account deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete account.' });
  }
};

exports.uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const avatarPath = `/uploads/avatars/${req.file.filename}`;
    user.avatar = avatarPath;
    await user.save();

    res.status(200).json({
      message: 'Avatar uploaded successfully.',
      avatar: avatarPath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload avatar.', error: error.message });
  }
};