const express = require('express');
const axios = require('axios');
const router = express.Router();
const https = require('https');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path'); // Add this line

const agent = new https.Agent({  
    rejectUnauthorized: false
});

// Fetch rainfall data from API
router.get('/fetch', async (req, res) => {
    try {
        const response = await axios.get('https://www.dhm.gov.np/frontend_dhm/hydrology/getRainfallFilter', { httpsAgent: agent });

        // Assuming the rainfall data is in the first object in the array '0'
        const rainfallDataArray = response.data.data['0'];

        if (rainfallDataArray && rainfallDataArray.length > 0) {
            // Extracting specific fields from each object
            const rainfallDetails = rainfallDataArray.map(item => ({
                stationName: item.name,
                status: item.status,
                basin: item.basin,
                longitude: item.longitude,
                latitude: item.latitude,
                value: item.value == null ? 0 : item.value
            }));

            // Prepare data for CSV
            const csvData = rainfallDetails.map(({ longitude, latitude, value }) => ({
                longitude,
                latitude,
                value
            }));

            // Define the CSV writer
            const csvWriter = createCsvWriter({
                path: path.join(__dirname, 'rainfall_data.csv'), // Path to save the CSV file
                header: [
                    { id: 'longitude', title: 'Longitude' },
                    { id: 'latitude', title: 'Latitude' },
                    { id: 'value', title: 'Value' }
                ]
            });

            // Write data to CSV
            await csvWriter.writeRecords(csvData);
            console.log('CSV file created successfully.');

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
