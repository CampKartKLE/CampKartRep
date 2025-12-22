// server/controllers/listingController.js
const Listing = require("../models/Listing");

// -----------------------------
// GET ALL LISTINGS (filters)
// -----------------------------
exports.getAllListings = async (req, res) => {
  try {
    let query = {};

    const { q, category, minPrice, maxPrice, condition, location } = req.query;

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    if (category && category !== "All Items") query.category = category;

    if (minPrice) query.price = { ...query.price, $gte: Number(minPrice) };
    if (maxPrice) query.price = { ...query.price, $lte: Number(maxPrice) };

    if (condition) query.condition = { $in: condition.split(",") };

    if (location)
      query.location = { $regex: location, $options: "i" };

    // Sorting
    let sortOption = { createdAt: -1 }; // default: newest
    const { sort } = req.query;

    if (sort === "price_asc") sortOption = { price: 1 };
    else if (sort === "price_desc") sortOption = { price: -1 };
    else if (sort === "popular") sortOption = { views: -1 };
    else if (sort === "newest") sortOption = { createdAt: -1 };

    const listings = await Listing.find(query).sort(sortOption);

    res.json(listings);
  } catch (err) {
    console.error("GetAllListings error:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

// -----------------------------
// GET LISTING BY ID
// -----------------------------
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    // Unique View Tracking
    // Identifier: User ID (if auth) or IP address
    const viewerId = req.user ? req.user.id : req.ip;

    // Initialize viewedBy if it doesn't exist (compatibility)
    if (!listing.viewedBy) listing.viewedBy = [];

    if (!listing.viewedBy.includes(viewerId)) {
      listing.viewedBy.push(viewerId);
      listing.views += 1;
      await listing.save();
    }

    res.json(listing);
  } catch (err) {
    console.error("GetListing error:", err);
    res.status(500).json({ message: "Failed to fetch listing" });
  }
};

// -----------------------------
// CREATE LISTING (WITH IMAGES)
// -----------------------------
exports.createListing = async (req, res) => {
  try {
    const { title, description, price, category, condition, location } = req.body;

    if (!title || !price || !category || !condition) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure images exist (multer upload)
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Generate full URLs (Cloudinary returns the URL in file.path)
    const imageUrls = req.files.map((file) => file.path);

    const newListing = await Listing.create({
      title,
      description,
      price,
      category,
      condition,
      location,
      images: imageUrls,
      seller: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        verified: req.user.isVerifiedStudent,
      },
      views: 0,
      isAvailable: true,
    });

    // ----------------------------------------------------------------
    // Notification Trigger: New Listing in Category
    // ----------------------------------------------------------------
    try {
      const notificationService = require("../services/notificationService");
      const interestedUsers = await notificationService.findUsersInterestedIn(category);

      if (interestedUsers.length > 0) {
        await notificationService.sendBulkNotification(
          interestedUsers,
          "new_listing",
          "📚 New Listing Alert!",
          `New in ${category}: ${title} for ₹${price}`,
          { listingId: newListing._id, category, price }
        );
      }
    } catch (notifError) {
      console.error("Notification Trigger Error:", notifError);
      // Don't fail the request just because notification failed
    }

    res.status(201).json({ success: true, listing: newListing });
  } catch (err) {
    console.error("CreateListing error:", err);
    res.status(500).json({ message: "Failed to create listing" });
  }
};

// -----------------------------
// UPDATE LISTING
// -----------------------------
exports.updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.seller.id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Handle Images
    let finalImages = listing.images; // fallback

    // If we have new files or existingImages field, we update images
    if (req.files || req.body.existingImages) {
      const newImageUrls = req.files ? req.files.map((file) => file.path) : [];
      const existingImages = req.body.existingImages ? [].concat(req.body.existingImages) : [];
      finalImages = [...existingImages, ...newImageUrls];
    }

    // Create update object
    const updateData = {
      ...req.body,
      images: finalImages
    };

    const updated = await Listing.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    // ----------------------------------------------------------------
    // Notification Trigger: Price Drop
    // ----------------------------------------------------------------
    if (req.body.price) {
      const newPrice = Number(req.body.price);

      if (newPrice < listing.price) {
        try {
          const notificationService = require("../services/notificationService");
          const interestedUsers = await notificationService.findUsersWithWishlist(listing._id);

          if (interestedUsers.length > 0) {
            const dropAmount = listing.price - newPrice;
            const dropPercent = Math.round((dropAmount / listing.price) * 100);

            await notificationService.sendBulkNotification(
              interestedUsers,
              "price_drop",
              "💰 Price Drop Alert!",
              `${listing.title} is now ₹${newPrice} (was ₹${listing.price}). ${dropPercent}% Off!`,
              { listingId: listing._id, price: newPrice, oldPrice: listing.price }
            );
          }
        } catch (notifErr) {
          console.error("Price Drop Notification Error:", notifErr);
        }
      }
    }

    res.json(updated);
  } catch (err) {
    console.error("UpdateListing error:", err);
    res.status(500).json({ message: "Failed to update listing" });
  }
};

// -----------------------------
// DELETE LISTING
// -----------------------------
exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.seller.id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.json({ message: "Listing deleted" });
  } catch (err) {
    console.error("DeleteListing error:", err);
    res.status(500).json({ message: "Failed to delete listing" });
  }
};
