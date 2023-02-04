import React from "react";
import GaugeChart from 'react-gauge-chart';

const Speedometer = (props) => {
  return(
      <div style={{ backgroundColor: '#282c34' }}>
        <GaugeChart
            id="gauge-chart2"
            nrOfLevels={20}
            percent={0.86}
            animDelay={0.5}
        />
      </div>
  );
}

export default Speedometer;