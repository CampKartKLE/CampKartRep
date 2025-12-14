// server/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTP } = require("../utils/emailService");
const { createOTP, verifyOTP } = require("../utils/otpStorage");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "campkartsecret";
const OTP_EXPIRY = Number(process.env.OTP_EXPIRY_MINUTES) || 10;

// Remove password before sending user to frontend
const sanitizeUser = (userDoc) => {
  if (!userDoc) return null;
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;
  const { password, ...safe } = user;
  return safe;
};

/* ============================================================
    STEP 1 — REQUEST OTP
   ============================================================ */
exports.requestOTP = async (req, res) => {
  try {
    const { name, email, password, phone, campus } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // student domain restriction
    const normalizedEmail = email.toLowerCase().trim();
    if (!normalizedEmail.endsWith(".ac.in") && !normalizedEmail.endsWith(".edu")) {
      return res.status(400).json({
        message: "Only .ac.in or .edu emails allowed for signup",
      });
    }

    // check if user already exists
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save temporary user info + OTP
    createOTP(
      normalizedEmail,
      otp,
      { name, email: normalizedEmail, password, phone, campus },
      OTP_EXPIRY
    );

    // send email OTP
    await sendOTP(normalizedEmail, otp, name);

    res.json({
      message: "OTP sent to your email",
      email: normalizedEmail,
      expiresIn: OTP_EXPIRY,
    });
  } catch (err) {
    console.error("OTP Request Error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* ============================================================
    STEP 2 — VERIFY OTP & CREATE ACCOUNT
   ============================================================ */
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const result = verifyOTP(normalizedEmail, otp);
    if (!result.success) {
      return res.status(400).json({
        message: result.message,
        attemptsLeft: result.attemptsLeft,
      });
    }

    const tempUser = result.tempUserData;

    // safety: double-check user does not already exist in database
    const existing = await User.findOne({
      email: normalizedEmail,
    });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(tempUser.password, 10);

    // create user in MongoDB
    const newUser = await User.create({
      name: tempUser.name,
      email: normalizedEmail,
      phone: tempUser.phone,
      campus: tempUser.campus || "",
      password: hashedPassword,
      isVerifiedStudent: true,
    });

    // issue JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Account created successfully",
      token,
      user: sanitizeUser(newUser),
    });
  } catch (err) {
    console.error("OTP Verify Error:", err);
    res.status(500).json({ message: "Verification failed" });
  }
};

/* ============================================================
    LOGIN
   ============================================================ */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

/* ============================================================
    GET CURRENT USER
   ============================================================ */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user: sanitizeUser(user) });
  } catch (err) {
    console.error("GetMe Error:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
