const express = require('express');
const Router = express.Router();
const { 
    getMyListings, 
    getFavorites, 
    addToFavorites, 
    deleteFromFavorites, 
    getUserData, 
    setProfilePhoto, 
    editUserData 
} = require('../Controllers/userControllers');
const upload = require('../multerConfig');

Router.get('/', getUserData);
Router.post('/', editUserData);

Router.post('/setPhoto', upload.single('image'), setProfilePhoto);

Router.get('/listings', getMyListings);

Router.get('/favorites', getFavorites);
Router.post('/favorites', addToFavorites);
Router.delete('/favorites', deleteFromFavorites);

module.exports = Router;