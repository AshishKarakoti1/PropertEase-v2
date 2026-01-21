const express = require('express');
const Router = express.Router();
const { login, signUp } = require('../Controllers/authControllers');
const { signUpValidation, loginValidation } = require('../Middlewares/AuthValidation');

Router.post('/login', loginValidation, login);
Router.post('/signup', signUpValidation, signUp);

module.exports = Router;