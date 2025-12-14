const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(401).json({ message: "Invalid or expired token" });

    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      isVerifiedStudent: user.isVerifiedStudent
    };
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(401).json({ message: "Token verification failed" });
  }
};
