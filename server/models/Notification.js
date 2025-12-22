const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        type: {
            type: String,
            enum: [
                "new_listing",
                "trending",
                "price_drop",
                "message",
                "sold",
                "offer",
                "system",
                "rating_alert",
            ],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        metadata: {
            listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
            sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            price: Number,
            category: String,
            conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Index for efficient fetching of user's notifications
notificationSchema.index({ recipient: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
