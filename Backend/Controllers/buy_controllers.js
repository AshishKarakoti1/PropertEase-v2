const userModel = require('../Models/userModel');
const listingModel = require('../Models/listingModel');

async function getAllListings(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const listings = await listingModel.find().skip((page - 1) * limit).limit(limit);
    const totalListings = await listingModel.countDocuments();
    
    res.status(200).json({ 
        success: true, 
        listings, 
        totalListings, 
        totalPages: Math.ceil(totalListings / limit), 
        currentPage: page 
    });
}

async function getTopThree(req, res) {
    const { category = 'selling', order = 1 } = req.query;

    const listings = await listingModel
        .find({ category })
        .sort({ price: parseInt(order) })
        .limit(3);

    res.status(200).json({
        success: true,
        listings,
        message: 'Listings fetched successfully',
    });
}

async function handleFilters(req, res) {
    const { price, location, area, bedrooms, bathrooms, category } = req.body;
    const page = parseInt(req.query.page) || 1;
    const limit = 6;

    let filter = {};
    if (price) filter.price = { $lte: parseInt(price) };
    if (bedrooms) filter.bedrooms = { $lte: parseInt(bedrooms) };
    if (bathrooms) filter.bathrooms = { $lte: parseInt(bathrooms) };
    if (location) filter.location = { $regex: new RegExp(location, 'i') };
    if (area) filter.area = { $lte: parseInt(area) };
    if (category) {
        filter.category = category === 'buying' ? 'selling' : category;
    }

    const totalListings = await listingModel.countDocuments(filter);
    const filteredListings = await listingModel.find(filter).skip((page - 1) * limit).limit(limit);

    res.status(200).json({
        success: true,
        message: "Listings filtered successfully",
        filteredListings,
        totalListings,
        totalPages: Math.ceil(totalListings / limit),
        currentPage: page
    });
}

async function updateListing(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    const listing = await listingModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!listing) {
        return res.status(404).json({ 
            success: false, 
            message: "Listing not found" 
        });
    }

    return res.status(200).json({
        success: true,
        message: `Listing with id ${id} successfully updated.`,
        updated_listing: listing,
    });
}

async function getListingById(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ success: false, message: "Invalid ID" });

    const listing = await listingModel.findById(id).populate('createdBy');
    if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

    return res.status(200).json({ success: true, listing });
}

async function deleteListing(req, res) {
    const { email } = req.body;
    const id = req.params.id;

    if (!id || !email) {
        return res.status(400).json({ success: false, message: "Invalid details" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.listings.includes(id)) {
        return res.status(404).json({ success: false, message: "Listing not found in user's listings" });
    }

    await listingModel.findByIdAndDelete(id);

    user.listings = user.listings.filter(listingId => listingId.toString() !== id);
    await user.save();

    const fullUpdatedListings = await listingModel.find({ _id: { $in: user.listings } });

    return res.status(200).json({ success: true, updatedListings: fullUpdatedListings });
}

module.exports = { 
    getAllListings, 
    handleFilters, 
    updateListing, 
    getListingById, 
    deleteListing, 
    getTopThree 
};