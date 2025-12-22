const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

// ------------------------
// Multer Setup
// ------------------------
const { storage } = require("../config/cloudinary");
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });

// ------------------------
// Multer Setup
// ------------------------
const upload = multer({ storage });

// ------------------------
// Listing Routes
// ------------------------
const optionalAuth = require("../middleware/optionalAuth");

// ------------------------
// Listing Routes
// ------------------------
router.get("/", listingController.getAllListings);
router.get("/:id", optionalAuth, listingController.getListingById);

router.post("/", authMiddleware, upload.array("images", 5), listingController.createListing);

router.put("/:id", authMiddleware, upload.array("images", 5), listingController.updateListing);
router.delete("/:id", authMiddleware, listingController.deleteListing);

module.exports = router;
