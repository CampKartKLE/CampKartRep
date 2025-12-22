const User = require("../models/User");
const Listing = require("../models/Listing");

// -----------------------------
// TOGGLE WISHLIST ITEM
// -----------------------------
exports.toggleWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const listingId = req.params.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Ensure listing exists (optional but good practice)
        const listing = await Listing.findById(listingId);
        if (!listing) return res.status(404).json({ message: "Listing not found" });

        const isFavorited = user.wishlist.includes(listingId);

        if (isFavorited) {
            // Remove
            user.wishlist = user.wishlist.filter((id) => id.toString() !== listingId);
        } else {
            // Add
            user.wishlist.push(listingId);
        }

        await user.save();

        res.json({ success: true, wishlist: user.wishlist, isFavorited: !isFavorited });
    } catch (err) {
        console.error("ToggleWishlist error:", err);
        res.status(500).json({ message: "Failed to update wishlist" });
    }
};

// -----------------------------
// GET WISHLIST
// -----------------------------
exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("wishlist");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user.wishlist);
    } catch (err) {
        console.error("GetWishlist error:", err);
        res.status(500).json({ message: "Failed to fetch wishlist" });
    }
};
