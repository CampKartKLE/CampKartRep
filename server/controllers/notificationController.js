const Notification = require("../models/Notification");

// Get User Notifications
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50); // Limit to last 50

        // Count unread
        const unreadCount = await Notification.countDocuments({
            recipient: req.user.id,
            read: false
        });

        res.json({ notifications, unreadCount });
    } catch (err) {
        console.error("Get Notifications Error:", err);
        res.status(500).json({ message: "Failed to fetch notifications" });
    }
};

// Mark as Read
exports.markAsRead = async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Failed to update notification" });
    }
};

// Mark All as Read
exports.markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { recipient: req.user.id, read: false },
            { $set: { read: true } }
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: "Failed to update notifications" });
    }
};

// Test Notification (Dev only)
exports.testNotification = async (req, res) => {
    const { type, title, message } = req.body;
    const notificationService = require("../services/notificationService");
    await notificationService.sendNotification(req.user.id, type || "system", title || "Test", message || "Test Message");
    res.json({ success: true });
};

// Update Preferences
exports.updatePreferences = async (req, res) => {
    try {
        const User = require("../models/User");
        const { emailNotifications, pushNotifications, priceAlertThreshold, categories } = req.body;

        // Construct update object cleanly
        const updateFields = {};
        if (emailNotifications !== undefined) updateFields["preferences.emailNotifications"] = emailNotifications;
        if (pushNotifications !== undefined) updateFields["preferences.pushNotifications"] = pushNotifications;
        if (priceAlertThreshold !== undefined) updateFields["preferences.priceAlertThreshold"] = priceAlertThreshold;
        if (categories !== undefined) updateFields["preferences.categories"] = categories;

        await User.findByIdAndUpdate(req.user.id, { $set: updateFields });
        res.json({ success: true });
    } catch (err) {
        console.error("Update Preferences Error:", err);
        res.status(500).json({ message: "Failed to update preferences" });
    }
};
