import GaugeChart from 'react-gauge-chart';
import ROSConfig from '../scripts/ROSConfig';
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";


function Speedometer(props) {

  const [linSpeed, setLinSpeed] = useState(null)

  useEffect(() => {
    setLinSpeed(ROSConfig.linSpeed)
  }, [])

  const linSpeedUp= () => {
    let temp = linSpeed * 1.1
    setLinSpeed(temp)
  }

  const linSpeedDown= () => {
    let temp = linSpeed * 0.9
    setLinSpeed(temp)
  }
  
  return(
        <div style={{ backgroundColor: '#282c34' }}>
          <GaugeChart
              id="speedometer-gauge"
              nrOfLevels={20}
              percent={linSpeed / 100} //change divisor as needed
              animDelay={0.5}
          />
          <Button onClick={linSpeedUp}> U </Button>
          <Button onClick={linSpeedDown}> J </Button>
        </div>
        
  );
}

export default Speedometer;
