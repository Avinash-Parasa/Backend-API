const express = require('express');
const User = require('../models/User');
const TravelDetails = require('../models/TravelDetails');

const router = express.Router();

// Middleware to verify user login based on email and password
const verifyUser = async (req, res, next) => {

    console.log("usre verification")
    console.log("usre verificon")
    const { email, password } = req.body;
    
    console.log('Route hit with payload:', req.body);
    console.log("usre verificon")
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const bcrypt = require('bcrypt');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    req.user = user; // Store user object in request for use in route
    next();
};


// Route to save travel details for the user
router.post('/add-travel-details', verifyUser, async (req, res) => {


    
    console.log('Route hit with payload:', req.body);
    try {
        const { destination, startDate, endDate, expenses } = req.body;
        const user = req.user; // Verified user from middleware

        const newTravelDetail = new TravelDetails({
            destination,
            startDate,
            endDate,
            expenses,
        });

        user.travelDetails.push(newTravelDetail);
        await user.save();

        res.status(201).json({
            message: 'Travel details added successfully',
            travelDetail: newTravelDetail,
        });
    } catch (error) {
        console.error('Error in backend:', error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
