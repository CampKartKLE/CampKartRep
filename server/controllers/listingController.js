const fs = require('fs');
const path = require('path');

const listingsPath = path.join(__dirname, '../data/listings.json');

const getListings = () => {
    try {
        const data = fs.readFileSync(listingsPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const saveListings = (listings) => {
    fs.writeFileSync(listingsPath, JSON.stringify(listings, null, 2));
};

exports.getAllListings = (req, res) => {
    let listings = getListings();
    const { q, category, minPrice, maxPrice, condition, location } = req.query;

    // Filter by search query
    if (q) {
        const lowerQ = q.toLowerCase();
        listings = listings.filter(l =>
            l.title.toLowerCase().includes(lowerQ) ||
            l.description.toLowerCase().includes(lowerQ)
        );
    }

    // Filter by category
    if (category && category !== 'All Items') {
        listings = listings.filter(l => l.category === category);
    }

    // Filter by price
    if (minPrice) {
        listings = listings.filter(l => l.price >= Number(minPrice));
    }
    if (maxPrice) {
        listings = listings.filter(l => l.price <= Number(maxPrice));
    }

    // Filter by condition
    if (condition) {
        const conditions = condition.split(',');
        listings = listings.filter(l => conditions.includes(l.condition));
    }

    // Filter by location
    if (location) {
        // Simple string match for now
        listings = listings.filter(l => l.location.toLowerCase().includes(location.toLowerCase()));
    }

    res.json(listings);
};

exports.getListingById = (req, res) => {
    const listings = getListings();
    const listing = listings.find(l => l.id === req.params.id);

    if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
    }

    // Increment views (simple implementation)
    listing.views = (listing.views || 0) + 1;
    saveListings(listings);

    res.json(listing);
};

exports.createListing = (req, res) => {
    const { title, description, price, category, condition, images, location } = req.body;

    if (!title || !price || !category || !condition) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const listings = getListings();

    const newListing = {
        id: Date.now().toString(),
        title,
        description,
        price: Number(price),
        category,
        condition,
        images: images || [],
        location,
        sellerId: req.user.id,
        sellerName: req.user.name, // Denormalize for easier display
        sellerVerified: req.user.isVerifiedStudent,
        createdAt: new Date().toISOString(),
        views: 0,
        isAvailable: true
    };

    listings.push(newListing);
    saveListings(listings);

    res.status(201).json(newListing);
};

exports.updateListing = (req, res) => {
    const listings = getListings();
    const index = listings.findIndex(l => l.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: 'Listing not found' });
    }

    if (listings[index].sellerId !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedListing = { ...listings[index], ...req.body };
    listings[index] = updatedListing;
    saveListings(listings);

    res.json(updatedListing);
};

exports.deleteListing = (req, res) => {
    let listings = getListings();
    const listing = listings.find(l => l.id === req.params.id);

    if (!listing) {
        return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.sellerId !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    listings = listings.filter(l => l.id !== req.params.id);
    saveListings(listings);

    res.json({ message: 'Listing deleted' });
};
