const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    campus: { type: String },
    password: { type: String, required: true },
    isVerifiedStudent: { type: Boolean, default: false },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
    notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Notification" }], // Optional reference if needed, but redundant if we query Notification collection
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true },
      categories: [String], // Categories user wants notifications for
      priceAlertThreshold: { type: Number, default: 20 }, // % price drop to alert
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
