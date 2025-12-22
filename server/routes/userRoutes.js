const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected Routes
router.post("/wishlist/:id", authMiddleware, userController.toggleWishlist);
router.get("/wishlist", authMiddleware, userController.getWishlist);

module.exports = router;
