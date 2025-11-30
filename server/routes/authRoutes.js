// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// STEP 1: Request OTP for signup
router.post('/request-otp', authController.requestOTP);

// STEP 2: Verify OTP and create account
router.post('/verify-otp', authController.verifyOTP);

// Login with email + password
router.post('/login', authController.login);

// Get current logged-in user
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
