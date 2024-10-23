import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RainfallDisplay = () => {
    const [rainfallDetails, setRainfallDetails] = useState([]);

    const fetchRainfallData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/rainfall/fetch');
            const fetchedData = response.data.rainfallDetails;

            if (Array.isArray(fetchedData)) {
                setRainfallDetails(fetchedData);
            } else {
                console.error("Expected an array but received: ", fetchedData);
            }
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
            {rainfallDetails && rainfallDetails.length > 0 ? (
                rainfallDetails.map((station, index) => (
                    <div key={index}>
                        <p><strong>Station Name:</strong> {station.stationName}</p>
                        <p><strong>Status:</strong> {station.status}</p>
                        <p><strong>Basin:</strong> {station.basin}</p>
                        <p><strong>Longitude:</strong> {station.longitude}</p>
                        <p><strong>Latitude:</strong> {station.latitude}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RainfallDisplay;
