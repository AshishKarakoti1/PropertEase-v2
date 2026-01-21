require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "helloWorld";

const generateToken = async (email, id) => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.sign(
        { email, id },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};

module.exports = generateToken;