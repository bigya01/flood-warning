import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RainfallDisplay = () => {
  const [rainfallDetails, setRainfallDetails] = useState([]);

  const fetchRainfallData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/rainfall/fetch');
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
    const interval = setInterval(fetchRainfallData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rainfall-container">
      <h1 className="rainfall-title">Rainfall Data</h1>
      
      {rainfallDetails && rainfallDetails.length > 0 ? (
        <div className="card-grid">
          {rainfallDetails.map((station, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <h2 className="station-name">{station.stationName}</h2>
                <span className="status-badge">{station.status}</span>
              </div>
              
              <div className="card-content">
                <div className="info-row">
                  <span className="label">Basin:</span>
                  <span className="value">{station.basin}</span>
                </div>
                
                <div className="info-row">
                  <span className="label">Location:</span>
                  <span className="value">{station.longitude}°, {station.latitude}°</span>
                </div>
                
                <div className="gauge-value">
                  <span className="gauge-label">Rain Gauge Value</span>
                  <div className="gauge-number">{station.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}

      <style>{`
        .rainfall-container {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .rainfall-title {
          font-size: 28px;
          color: #1e40af;
          margin-bottom: 24px;
          font-weight: bold;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          border: 1px solid #e6e6e6;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .card-header {
          background: #f0f7ff;
          padding: 16px;
          border-bottom: 1px solid #e6e6e6;
        }

        .station-name {
          font-size: 20px;
          color: #1e40af;
          margin: 0 0 8px 0;
          font-weight: 600;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          background: #dbeafe;
          color: #1e40af;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 500;
        }

        .card-content {
          padding: 16px;
        }

        .info-row {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .label {
          font-weight: 500;
          color: #4b5563;
          margin-right: 8px;
          min-width: 80px;
        }

        .value {
          color: #1f2937;
        }

        .gauge-value {
          margin-top: 16px;
          padding: 12px;
          background: #f0f7ff;
          border-radius: 6px;
          text-align: center;
        }

        .gauge-label {
          display: block;
          font-size: 14px;
          color: #3b82f6;
          margin-bottom: 4px;
          font-weight: 500;
        }

        .gauge-number {
          font-size: 24px;
          font-weight: bold;
          color: #1e40af;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #6b7280;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .card-grid {
            grid-template-columns: 1fr;
          }
          
          .rainfall-container {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default RainfallDisplay;