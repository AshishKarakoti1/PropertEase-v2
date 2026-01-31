const listingModel = require("../Models/listingModel");
const userModel = require("../Models/userModel");
const uploadToCloudinary = require("../cloudinaryUpload");

const createListing = async (req, res) => {
  try {
    const { location, bedrooms, bathrooms, area, price, category } = req.body;

    const email = req.user?.email;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!location || !bedrooms || !bathrooms || !area || !price || !category) {
      return res.status(400).json({ success: false, message: "Incomplete details" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    // 🚀 Upload each image to Cloudinary
    const uploadResults = await Promise.all(
      req.files.map(file => uploadToCloudinary(file))
    );

    const imageUrls = uploadResults.map(result => result.secure_url);

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

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

module.exports = { createListing };
