const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Admin credentials
// const ADMIN_EMAIL = 'admin@gmail.com';
// const ADMIN_PASSWORD = '123456';

// Admin Route to Get All Users' Travel Details
router.post('/detail', async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    // // Verify if the admin credentials are correct
    // if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    //     return res.status(403).json({ message: 'Forbidden. Invalid admin credentials.' });
    // }

    try {
        // Fetch all users' data from the database
        const users = await User.find().select('name email travelDetails');
        
        // Format the data as requested
        const userDetails = users.reduce((acc, user) => {
            acc[user.name] = user.travelDetails;
            return acc;
        }, {});

        res.status(200).json({ users: userDetails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

