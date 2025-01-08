require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

// Initialize Express app
const app = express();

// Middleware for handling CORS and requests
app.use(cors({
    origin: 'http://localhost:3001',  // React app's URL (change to your actual frontend URL)
    methods: 'GET,POST,PUT,DELETE',  // Allow these methods
    allowedHeaders: 'Content-Type',  // Allow headers for CORS requests
}));
app.use(express.json());

// Middleware for JSON data
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error(err));

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const travelRoutes = require('./routes/travelRoutes');
const userRoutes = require('./routes/userRoutes');  // Import the userRoutes

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/user', userRoutes);  // Use the user routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
