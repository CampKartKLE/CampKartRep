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

    const listings = await Listing.find(query).sort({ createdAt: -1 });

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

    listing.views += 1;
    await listing.save();

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
