// server/models/Listing.js
const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String, // full URLs: BASE_URL/uploads/<file>
      },
    ],

    location: {
      type: String,
    },

    // -------------------------
    // Updated unified seller object
    // -------------------------
    seller: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      verified: {
        type: Boolean,
        default: false,
      },
    },

    views: {
      type: Number,
      default: 0,
    },

    // For tracking unique views
    viewedBy: [String],

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
