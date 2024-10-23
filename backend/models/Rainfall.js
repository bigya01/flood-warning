const mongoose = require('mongoose');

// Define the Rainfall schema
const rainfallSchema = new mongoose.Schema({
    stationId: { type: Number, required: true },
    name: { type: String, required: true },
    basin: { type: String, required: true },
    district: { type: String, required: true },
    status: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    totalRainfall: { type: Number }, // Add any field you need, e.g., totalRainfall
    timestamp: { type: Date, default: Date.now }
});

// Create a Rainfall model
const Rainfall = mongoose.model('Rainfall', rainfallSchema);
module.exports = Rainfall;