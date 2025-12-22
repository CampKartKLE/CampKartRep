const cron = require("node-cron");
const Listing = require("../models/Listing");
const notificationService = require("../services/notificationService");
const User = require("../models/User");

const checkTrendingItems = async () => {
    try {
        console.log("Running Trending Items Job...");

        // Logical Definition of Trending for MVP:
        // Items created in last 7 days with > 50 views (for testing, maybe lower)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const trendingListings = await Listing.find({
            createdAt: { $gte: sevenDaysAgo },
            views: { $gt: 10 } // Low threshold for testing, increase for prod
        }).limit(3);

        if (trendingListings.length === 0) return;

        // Simplify: Just notify about the top 1 for now to avoid spam
        const topItem = trendingListings[0];

        // Find users who have enabled push notifications (and maybe trending category?)
        const users = await User.find({ "preferences.pushNotifications": true });
        const userIds = users.map(u => u._id);

        if (userIds.length > 0) {
            await notificationService.sendBulkNotification(
                userIds,
                "trending",
                "🔥 Trending Now!",
                `${topItem.title} is getting a lot of attention! Check it out.`,
                { listingId: topItem._id }
            );
            console.log(`Sent trending notification for ${topItem.title} to ${userIds.length} users.`);
        }
    } catch (err) {
        console.error("Trending Job Error:", err);
    }
};

// Run every day at 10:00 AM
// For demo purposes, maybe easier to trigger manually or frequent
// '0 10 * * *' = 10 AM daily
const init = () => {
    cron.schedule("0 10 * * *", checkTrendingItems);
    console.log("Trending Item Job scheduled.");
};

module.exports = { init, checkTrendingItems }; // Expert for testing
