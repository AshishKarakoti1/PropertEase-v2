const express = require('express');
const Router = express.Router();
const { 
    getAllListings, 
    handleFilters, 
    deleteListing, 
    updateListing, 
    getListingById, 
    getTopThree 
} = require('../Controllers/buy_controllers');

Router.route('/')
    .get(getAllListings)
    .post(handleFilters);

Router.route('/featured')
    .get(getTopThree);

Router.route('/:id')
    .get(getListingById)
    .put(updateListing)
    .delete(deleteListing);

module.exports = Router;