const mongoose = require('mongoose');

const TravelDetailsSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    expenses: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('TravelDetails', TravelDetailsSchema);
