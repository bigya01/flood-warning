import React from 'react';
import MapComponent from './MapComponent';

const App = () => {
    const redMarkers = [
        { lat: 27.700769, lng: 85.300140, value: 120 }, // Kathmandu
        { lat: 27.6713, lng: 85.324, value: 130 }
    ];

    const greenMarkers = [
        { lat: 27.6700, lng: 85.3240, value: 80 },
        { lat: 27.6880, lng: 85.3250, value: 90 }
    ];

    return (
        <div>
            <MapComponent 
                redMarkers={redMarkers} 
                greenMarkers={greenMarkers} 
                initialLatitude={28.3949} // Center of Nepal
                initialLongitude={84.1240} // Center of Nepal
                zoomLevel={6} // Adjusted zoom level
            />
        </div>
    );
};


export default App;
