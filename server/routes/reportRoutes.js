const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createReport,
  getAllReports,
} = require("../controllers/reportController");

router.post("/", auth, createReport);

// Optional: admin route
router.get("/", getAllReports);

module.exports = router;
