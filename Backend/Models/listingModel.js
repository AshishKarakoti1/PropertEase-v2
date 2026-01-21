const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['selling', 'renting'],
        required: true 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    images: {
        type: [String],
        required: true 
    }
}, { timestamps: true });

const listingModel = mongoose.model('listings', listingSchema);

module.exports = listingModel;