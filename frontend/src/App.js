import React, { useEffect } from 'react';
import MapComponent from './MapComponent';
import RainfallDisplay from './RainfallDisplay'; // Import your RainfallDisplay

const App = () => {
    const redMarkers = [
        { lat: 27.700769, lng: 85.300140 }, // Kathmandu
        { lat: 27.6713, lng: 85.324 }
    ];

    const greenMarkers = [
        { lat: 27.6700, lng: 85.3240 },
        { lat: 27.6880, lng: 85.3250 }
    ];

    useEffect(() => {
        const checkProximity = (userLocation) => {
            const RADIUS = 5000; // 5 km radius
            redMarkers.forEach(marker => {
                const distance = getDistance(userLocation, marker);
                if (distance <= RADIUS) {
                    sendNotification("You are near a red marker!");
                }
            });

        };

        const sendNotification = (message) => {
            if (Notification.permission === 'granted') {
                new Notification("Alert!", { body: message });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        new Notification("Alert!", { body: message });
                    }
                });
            }
        };

        const getDistance = (loc1, loc2) => {
            const toRad = (value) => (Math.PI / 180) * value;
            const R = 6371e3; // Earth radius in meters
            const φ1 = toRad(loc1.lat);
            const φ2 = toRad(loc2.lat);
            const Δφ = toRad(loc2.lat - loc1.lat);
            const Δλ = toRad(loc2.lng - loc1.lng);

            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                      Math.cos(φ1) * Math.cos(φ2) *
                      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in meters
        };

        // Get user location
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            checkProximity(userLocation);
        }, (error) => {
            console.error("Geolocation error: ", error);
        });
    }, []);

    return (
        <div>
            <MapComponent 
                redMarkers={redMarkers} 
                greenMarkers={greenMarkers} 
                initialLatitude={28.3949} 
                initialLongitude={84.1240} 
                zoomLevel={6} 
            />
            <RainfallDisplay /> 
        </div>
    );
};

export default App;
