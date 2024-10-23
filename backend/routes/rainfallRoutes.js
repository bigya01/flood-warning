const express = require('express');
const axios = require('axios');
const router = express.Router();
const https = require('https');

const agent = new https.Agent({  
    rejectUnauthorized: false
});
// Fetch rainfall data from API
router.get('/fetch', async (req, res) => {
    try {
        const response = await axios.get('https://www.dhm.gov.np/frontend_dhm/hydrology/getRainfallFilter', { httpsAgent: agent });        console.log('API Response', response.data);
        
        const currentRainfall = response.data.totalRainfall; // Adjust based on your data structure
        console.log('Current Rainfall: ', currentRainfall);
        
        // Return the rainfall data directly in the response
        res.json({ success: true, totalRainfall: currentRainfall });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Export the router
module.exports = router;
