import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';


import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet's default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const MapComponent = ({ redMarkers, greenMarkers, initialLatitude, initialLongitude, zoomLevel }) => {
    return (

      
            <MapContainer 
                center={[initialLatitude, initialLongitude]} 
                zoom={zoomLevel} 
                style={{ height: '500px', width: '100%', border: '1px solid black' }}  // Added border for visibility
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <div>Testing the map</div>
            {/* Loop through redMarkers and render them */}
            {redMarkers.map((point, index) => (
                <CircleMarker
                    key={`red-${index}`}
                    center={[point.lat, point.lng]}
                    color="red"
                    radius={8}
                >
                    <Popup>Value: {point.value}</Popup>
                </CircleMarker>
            ))}
            
            {/* Loop through greenMarkers and render them */}
            {greenMarkers.map((point, index) => (
                <CircleMarker
                    key={`green-${index}`}
                    center={[point.lat, point.lng]}
                    color="green"
                    radius={8}
                >
                    <Popup>Value: {point.value}</Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
