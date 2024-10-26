// Home.js
import React from 'react';
import MapComponent from './MapComponent';
import Visualization from './Frontend'; // Assuming this is your visualization component

const Home = ({ redMarkers, greenMarkers }) => {
    return (
        <div>
            <MapComponent redMarkers={redMarkers} greenMarkers={greenMarkers} initialLatitude={28.3949} initialLongitude={84.124} zoomLevel={7} />
            <Visualization />
        </div>
    );
};

export default Home;
