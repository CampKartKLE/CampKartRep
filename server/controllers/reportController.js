// server/controllers/reportController.js
const Report = require("../models/Report");

// -----------------------------
// CREATE REPORT
// -----------------------------
exports.createReport = async (req, res) => {
  try {
    const { listingId, reason, details } = req.body;

    if (!listingId || !reason) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReport = await Report.create({
      listingId,
      reason,
      details: details || "",
      reporterId: req.user ? req.user.id : null,
    });

    res.status(201).json(newReport);
  } catch (err) {
    console.error("CreateReport error:", err);
    res.status(500).json({ message: "Failed to create report" });
  }
};

// -----------------------------
// GET ALL REPORTS (Admin Feature)
// -----------------------------
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error("GetReports error:", err);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};
