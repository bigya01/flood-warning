import React, { useEffect, useState } from "react";
import MapComponent from "./MapComponent";
import Visualization from "./Frontend";
import RainfallDisplay from "./RainfallDisplay";
import { FaHome, FaInfo, FaPhone, FaEnvelope } from "react-icons/fa";
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import greenMarkersData from './green.json'; // Import green markers JSON

const App = () => {
  console.log("App component is rendering"); // This should print when the component renders

  const [greenMarkers, setGreenMarkers] = useState([]);

  



  // Hardcoded red markers
  const redMarkers = [
    { lat: 27.700769, lng: 85.30014 }, // Kathmandu
    { lat: 27.6713, lng: 85.324 },
    { lat: 27.7509337, lng: 85.3320221 },
    { lat: 29.97166667, lng: 81.81611111 },
    { lat: 28.2096, lng: 83.9856 }
  ];


  useEffect(() => {
    // Format and set green markers from JSON
    const formatMarkers = (markers) => 
      markers.map(marker => ({
        lat: marker.Latitude,
        lng: marker.Longitude,
        value: marker.Value
      }));
    
    setGreenMarkers(formatMarkers(greenMarkersData));

    const checkProximity = (userLocation) => {
      const RADIUS = 5000; // 5 km radius
      redMarkers.forEach((marker) => {
        const distance = getDistance(userLocation, marker);
        if (distance <= RADIUS) {
          sendNotification("You are near a red marker!");
        }
      });
    };

    const sendNotification = (message) => {
      if (Notification.permission === "granted") {
        new Notification("Alert!", { body: message });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
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
      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in meters
    };

    // Get user location and check proximity
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        checkProximity(userLocation);
      },
      (error) => {
        console.error("Geolocation error: ", error);
      }
    );
  }, []); // Dependency array is empty, so this runs once on mount.

  return (
    <Router>
    <div className="app-container">
      <div className="navbar">
        <h1>Flood Monitoring System</h1>
        <p className="tagline">Stay Alert, Stay Safe</p>
      </div>
      <div className="content-container">
        <div className="sidebar">
          <ul>
            <li>
              <Link className="linkk" to="/"><FaHome /> Home</Link>
            </li>
            <li>
              <Link className="linkk" to="/about"><FaInfo /> About</Link>
            </li>
            <li>
              <Link className="linkk" to="/contact"><FaEnvelope /> Contact Us</Link>
            </li>
            <li>
              <Link className="linkk" to="/rainfall"><FaPhone /> Rainfall Info</Link>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<MapComponent redMarkers={redMarkers} greenMarkers={greenMarkers} initialLatitude={28.3949} initialLongitude={84.124} zoomLevel={7} />} />
            <Route path="/about" element={<div><h2>About</h2><p>Information about the Flood Monitoring System.</p></div>} />
            <Route path="/contact" element={<div><h2>Contact Us</h2><p>Contact information goes here.</p></div>} />
            <Route path="/rainfall" element={<RainfallDisplay />} /> {/* Renders RainfallDisplay component at /rainfall */}
          </Routes>
          <Visualization /> {/* Visualization always rendered in main-content */}
        </div>
      </div>
    </div>
  </Router>
  );
};

export default App;
