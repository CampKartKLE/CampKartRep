const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../data/users.json');

const getUsers = () => {
    try {
        const data = fs.readFileSync(usersPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (!token || !token.startsWith('mock-token-')) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    const userId = token.replace('mock-token-', '');
    const users = getUsers();
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
};

module.exports = authMiddleware;
