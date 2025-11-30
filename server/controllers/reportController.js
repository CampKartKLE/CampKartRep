const fs = require('fs');
const path = require('path');

const reportsPath = path.join(__dirname, '../data/reports.json');

// Ensure reports file exists
if (!fs.existsSync(reportsPath)) {
    fs.writeFileSync(reportsPath, '[]');
}

const getReports = () => {
    try {
        const data = fs.readFileSync(reportsPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const saveReports = (reports) => {
    fs.writeFileSync(reportsPath, JSON.stringify(reports, null, 2));
};

exports.createReport = (req, res) => {
    const { listingId, reason, details } = req.body;

    if (!listingId || !reason) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const reports = getReports();

    const newReport = {
        id: Date.now().toString(),
        listingId,
        reporterId: req.user ? req.user.id : 'anonymous',
        reason,
        details,
        createdAt: new Date().toISOString()
    };

    reports.push(newReport);
    saveReports(reports);

    res.status(201).json(newReport);
};
