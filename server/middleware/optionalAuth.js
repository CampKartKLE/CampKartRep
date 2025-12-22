const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Metadata Reader - Optional Auth
 * Reads the token if present, but doesn't block request if missing.
 * Used for public routes where we want to know WHO is viewing if possible.
 */
module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            // No token, proceed as guest
            return next();
        }

        const token = authHeader.split(" ")[1];

        // Verify token but catch error so we don't crash/block
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const user = await User.findById(decoded.id);

            if (user) {
                req.user = {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    isVerifiedStudent: user.isVerifiedStudent
                };
            }
        } catch (tokenError) {
            // Token invalid/expired - just ignore and treat as guest
            // We do typically NOT want to error on public routes
        }

        next();
    } catch (err) {
        console.error("Optional Auth Error:", err);
        next();
    }
};
