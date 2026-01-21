const userModel = require('../Models/userModel');

async function getUserData(req, res) {
    const { email } = req.query;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, userData: user });
}

async function editUserData(req, res) {
    const { email } = req.query;
    const { username, contactNumber } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (username) user.username = username;
    if (contactNumber) user.contactNumber = contactNumber;

    if (username || contactNumber) {
        await user.save();
        return res.status(200).json({ success: true, message: "User details updated", user });
    } else {
        return res.status(400).json({ success: false, message: "No valid fields to update" });
    }
}

async function getMyListings(req, res) {
    const { email } = req.query;
    const user = await userModel.findOne({ email }).populate('listings');

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, listings: user.listings });
}

async function addToFavorites(req, res) {
    const { email, id } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.favorites.includes(id)) {
        user.favorites.push(id);
        await user.save();
    }

    await user.populate('favorites');

    return res.status(200).json({ 
        success: true, 
        favorites: user.favorites
    });
}

async function deleteFromFavorites(req, res) {
    const { email, id } = req.query; 
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.favorites = user.favorites.filter(ID => ID.toString() !== id);
    await user.save();
    await user.populate('favorites');

    return res.status(200).json({ 
        success: true, 
        favorites: user.favorites
    });
}

async function getFavorites(req, res) {
    const { email } = req.query;
    const user = await userModel.findOne({ email }).populate('favorites');

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
        success: true,
        favorites: user.favorites
    });
}

async function setProfilePhoto(req, res) {
    const { email } = req.body;
    const file = req.file;

    if (!email || !file) {
        return res.status(400).json({ success: false, message: 'Email and file are required' });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.URL = file.path;
    await user.save();

    return res.status(200).json({
        success: true,
        updatedUser: user
    });
}

module.exports = { 
    getMyListings, 
    getFavorites, 
    addToFavorites, 
    deleteFromFavorites, 
    getUserData, 
    setProfilePhoto, 
    editUserData 
};