const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

// All routes require auth
router.use(authMiddleware);

router.get("/", notificationController.getNotifications);
router.put("/read/:id", notificationController.markAsRead);
router.put("/read-all", notificationController.markAllAsRead);
router.put("/preferences", notificationController.updatePreferences);
router.post("/test", notificationController.testNotification);

module.exports = router;
