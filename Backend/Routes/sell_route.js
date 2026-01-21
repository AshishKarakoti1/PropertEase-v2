const express = require('express');
const Router = express.Router();
const isValidUser = require('../Middlewares/validUser');
const upload = require('../multerConfig');
const { createListing } = require('../Controllers/sellControllers');

Router.post(
    '/',
    upload.array('images', 5),
    isValidUser,
    createListing
);

module.exports = Router;