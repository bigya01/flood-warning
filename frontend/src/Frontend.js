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
      <h2>Precipitation Analysis</h2>

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
      <div className='scatter'>
        <img src={scatter} alt="Precipitation Scatter Plot" />
      </div>

    </div>

  );
};

export default Visualization;
