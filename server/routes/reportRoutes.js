const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
// Optional: require auth for reporting? The prompt says "Report Listing" opens a modal, implies user might be logged in or not. 
// "Report Listing" – opens a Modal + form (reason + comment) and calls backend report endpoint.
// Let's allow anonymous reports for now, or check if user is in req (optional auth).
// But usually reporting requires auth to prevent spam.
// The prompt doesn't explicitly say auth is required for reporting, but "To post a listing or perform certain actions (e.g., managing listings), users must log in".
// I'll make it optional or just pass user if available.
// I'll use a middleware that doesn't block if no token, but populates user if present?
// Or just use authMiddleware if I want to enforce it.
// I'll enforce it for now as it's safer.
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, reportController.createReport);

module.exports = router;
