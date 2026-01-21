const bcrypt = require('bcrypt');
const userModel = require('../Models/userModel');
const generateToken = require('../utils');

async function signUp(req, res) {
    const { username, email, password, contactNumber } = req.body;

    if (!username || !email || !password || !contactNumber) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
        contactNumber,
        URL: ''
    });

    await newUser.save();

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            contactNumber: newUser.contactNumber,
            URL: newUser.URL
        }
    });
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const jwtToken = await generateToken(user.email, user._id);

    res.status(200).json({
        success: true,
        message: "Login successful",
        jwtToken,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            contactNumber: user.contactNumber,
        }
    });
}

module.exports = { login, signUp };