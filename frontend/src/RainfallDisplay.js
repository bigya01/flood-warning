import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RainfallDisplay = () => {
    const [rainfall, setRainfall] = useState(null);

    const fetchRainfallData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/rainfall/fetch');
            setRainfall(response.data.totalRainfall);
        } catch (error) {
            console.error('Error fetching rainfall data:', error);
        }
    };

    useEffect(() => {
        fetchRainfallData();
        const interval = setInterval(fetchRainfallData, 5000); // Fetch every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Rainfall Data</h1>
            {rainfall !== null ? (
                <p>Current Rainfall: {rainfall} mm</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RainfallDisplay;
