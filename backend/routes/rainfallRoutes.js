const express = require('express');
const axios = require('axios');
const Rainfall = require('../models/Rainfall');
const router = express.Router();

// Fetch rainfall data from API and save it to MongoDB
router.get('/fetch', async (req, res) => {
    try {
        const response = await axios.get('https://www.dhm.gov.np/frontend_dhm/hydrology/getRainfallFilter');
        const currentRainfall = response.data.totalRainfall; // Adjust based on your data structure

        // Save to database
        const rainfallRecord = new Rainfall({ totalRainfall: currentRainfall });
        await rainfallRecord.save();

        res.json({ success: true, totalRainfall: currentRainfall });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Export the router
module.exports = router;
