const listingModel = require('../Models/listingModel');
const userModel = require('../Models/userModel');

const createListing = async (req, res) => {
    const { location, bedrooms, bathrooms, area, price, category } = req.body;
    
    const email = req.user?.email; 
    const user = await userModel.findOne({ email });
    
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!location || !bedrooms || !bathrooms || !area || !price || !category) {
        return res.status(400).json({ success: false, message: "Incomplete details" });
    }

    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
        return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    const imageUrls = Array.isArray(req.files) 
        ? req.files.map(file => file.path) 
        : [];

    const newListing = new listingModel({
        location,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        price: Number(price),
        category,
        images: imageUrls,
        createdBy: user._id,
    });

    const savedListing = await newListing.save();

    user.listings.push(savedListing._id);
    await user.save();

    return res.status(201).json({
        success: true,
        message: "Listing added successfully",
        listing: savedListing,
    });
};

module.exports = { createListing };