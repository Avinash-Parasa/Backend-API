const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const router = express.Router();

// Middleware to verify user login based on email and password
const verifyUser = async (req, res, next) => {
    console.log("hi");
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    req.user = user; // Store user object in request for use in route
    next();
};

// Route to get a user's details
router.post('/details', verifyUser, async (req, res) => {
    const user = req.user; // The authenticated user

    try {
        // Return user details along with their travel information
        res.status(200).json({
            name: user.name,
            email: user.email,
            travelDetails: user.travelDetails
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
