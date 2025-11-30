// server/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../utils/emailService');
const { createOTP, verifyOTP } = require('../utils/otpStorage');

const JWT_SECRET = process.env.JWT_SECRET || 'campkartsecret';
const OTP_EXPIRY = Number(process.env.OTP_EXPIRY_MINUTES) || 10;

// Simple in-memory users store for now
let users = [];

// Helper to avoid sending password hash to frontend
const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
};

// -----------------------------
// REQUEST OTP (STEP 1)
// -----------------------------
exports.requestOTP = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Restrict to student domains
    if (!email.endsWith('.ac.in') && !email.endsWith('.edu')) {
      return res
        .status(400)
        .json({ message: 'Only .ac.in or .edu emails allowed for signup' });
    }

    // Check existing user
    const existing = users.find((u) => u.email === email);
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP + temp user info
    createOTP(email, otp, { name, email, password, phone }, OTP_EXPIRY);

    // Send email
    await sendOTP(email, otp, name);

    res.json({ message: 'OTP sent to email', email, expiresIn: OTP_EXPIRY });
  } catch (err) {
    console.error('OTP error:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// -----------------------------
// VERIFY OTP (STEP 2)
// -----------------------------
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = verifyOTP(email, otp);

    if (!result.success) {
      return res
        .status(400)
        .json({ message: result.message, attemptsLeft: result.attemptsLeft });
    }

    const tempUser = result.tempUserData;

    // Hash password
    const hashedPassword = await bcrypt.hash(tempUser.password, 10);

    // Create final user
    const newUser = {
      id: Date.now(),
      name: tempUser.name,
      email: tempUser.email,
      phone: tempUser.phone,
      password: hashedPassword,
      isVerifiedStudent: true,
    };

    users.push(newUser);

    // Issue JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Account verified and created',
      token,
      user: sanitizeUser(newUser),
    });
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ message: 'Verification failed' });
  }
};

// -----------------------------
// LOGIN
// -----------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed' });
  }
};

// -----------------------------
// GET CURRENT USER (/me)
// -----------------------------
exports.getMe = async (req, res) => {
  try {
    // authMiddleware should set req.user = { id, email, ... }
    const user = users.find((u) => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user: sanitizeUser(user) });
  } catch (err) {
    console.error('GetMe error:', err);
    res.status(500).json({ message: 'Failed to get user' });
  }
};
