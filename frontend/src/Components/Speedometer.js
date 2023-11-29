import React from "react";
import GaugeChart from 'react-gauge-chart';
import ROSConfig from '../scripts/ROSConfig';
import { useState, useEffect, useRef } from "react";


function Speedometer(props) {
  let ref = useRef(ROSConfig.linSpeed);

  useEffect(() => {
    ref.current = ROSConfig.linSpeed;
  }, [ref.current])
  
  return(
        <div style={{ backgroundColor: '#282c34' }}>
          <GaugeChart
              id="speedometer-gauge"
              nrOfLevels={20}
              percent={ref.current / 100}
              animDelay={0.5}
          />
        </div>
        
  );
}

export default Speedometer;
