require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "helloWorld";

async function isValidUser(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = {
            email: decoded.email,
            id: decoded.id,
        };

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
        });
    }
}

module.exports = isValidUser;