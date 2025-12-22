const Notification = require("../models/Notification");
const User = require("../models/User");
const Listing = require("../models/Listing"); // If needed for querying
const socket = require("../socket");

/**
 * Send a notification to a specific user
 * @param {string} userId - Recipient User ID
 * @param {string} type - Notification Type
 * @param {string} title - Notification Title
 * @param {string} message - Notification Message
 * @param {object} metadata - Additional data (listingId, etc.)
 */
exports.sendNotification = async (userId, type, title, message, metadata = {}) => {
    try {
        const notification = await Notification.create({
            recipient: userId,
            type,
            title,
            message,
            metadata,
        });

        // Send Real-time Update via Socket.io
        try {
            const io = socket.getIO();
            // Emit to a room named after userId (assuming we join users to their own room on connection)
            io.to(userId.toString()).emit("notification", notification);
        } catch (err) {
            console.error("Socket emit failed:", err.message);
        }

        return notification;
    } catch (err) {
        console.error("Notification Service Error:", err);
    }
};

/**
 * Send notification to multiple users
 */
exports.sendBulkNotification = async (userIds, type, title, message, metadata = {}) => {
    try {
        const notifications = userIds.map((userId) => ({
            recipient: userId,
            type,
            title,
            message,
            metadata,
        }));

        const createdNotifications = await Notification.insertMany(notifications);

        // Socket emit loop (optimize with rooms if possible)
        try {
            const io = socket.getIO();
            userIds.forEach((userId) => {
                io.to(userId.toString()).emit("notification", {
                    type,
                    title,
                    message,
                    metadata,
                    createdAt: new Date()
                }); // Sending generic structure or fetch latest
            });
        } catch (err) {
            console.error("Socket bulk emit failed:", err.message);
        }

        return createdNotifications;
    } catch (err) {
        console.error("Bulk Notification Error:", err);
    }
};

/**
 * Find users interested in a category
 */
exports.findUsersInterestedIn = async (category) => {
    try {
        // Find users who have this category in their preferences
        // AND have notifications enabled
        const users = await User.find({
            "preferences.categories": category,
            "preferences.pushNotifications": true
        });
        return users.map(u => u._id);
    } catch (err) {
        console.error("Find Users Error:", err);
        return [];
    }
};

/**
 * Find users who have wishlisted a specific item
 */
exports.findUsersWithWishlist = async (listingId) => {
    try {
        const users = await User.find({
            wishlist: listingId,
            "preferences.pushNotifications": true
        });
        return users.map(u => u._id);
    } catch (err) {
        console.error("Find Wishlist Users Error:", err);
        return [];
    }
};
