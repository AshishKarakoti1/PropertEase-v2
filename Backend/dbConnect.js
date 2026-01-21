const mongoose = require('mongoose');

const connectDb = async (url) => {
    try {
        await mongoose.connect(url);
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = connectDb;