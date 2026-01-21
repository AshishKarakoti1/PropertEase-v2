const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    URL: { 
        type: String, 
        default: '' 
    },
    favorites: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'listings' 
    }],
    listings: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'listings' 
    }],
    resetPasswordToken: { 
        type: String 
    },
    resetPasswordExpires: { 
        type: Date 
    }
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;