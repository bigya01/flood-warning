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
        const response = await axios.get('https://www.dhm.gov.np/frontend_dhm/hydrology/getRainfallFilter', { httpsAgent: agent });
        console.log('API Response', response.data);

        // Assuming the rainfall data is in the first object in the array '0'
        const rainfallDataArray = response.data.data['0'];

        if (rainfallDataArray && rainfallDataArray.length > 0) {
            // Extracting specific fields from each object
            const rainfallDetails = rainfallDataArray.map(item => ({
                stationName: item.name,            // Station Name
                status: item.status,              // Status, e.g., 'BELOW WARNING LEVEL'
                basin: item.basin,                // Basin
                longitude: item.longitude,        // Longitude
                latitude: item.latitude,           // Latitude
                value: item.value          // Latitude

            }));
            
            console.log('Rainfall Details: ', rainfallDetails);

            // Return the rainfall data in a structured format
            res.json({ success: true, rainfallDetails });
        } else {
            res.json({ success: false, message: 'No rainfall data found' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});


// Export the router
module.exports = router;
