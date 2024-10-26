import React from 'react';

import scatter from './assets/scatter.png';
import percep from './assets/percep.png';
import precipitation from './assets/precipittion.png';
// const imagePaths = [

//   './assets/precipittion.png',

// ];
const Visualization = () => {
  return (
    <div className='all'>
      <h1>Precipitation Analysis</h1>

      <div className="visualization-container">
        <div className='percep'>
          <img src={percep} alt="Precipitation Scatter Plot" />
        </div>
        <div className='preciptiation'>
          <img src={precipitation} alt="Precipitation Scatter Plot" />
        </div>
        {/* {imagePaths.map((path, index) => (
        <img key={index} src={require(`${path}`)} alt={`Visualization ${index + 1}`} />
      ))} */}

      </div>
      <h1>Flood Alerts Based on Prediction</h1>

      <div className='scatter'>
        <img src={scatter} alt="Precipitation Scatter Plot" />
      </div>

    </div>

  );
};

export default Visualization;
