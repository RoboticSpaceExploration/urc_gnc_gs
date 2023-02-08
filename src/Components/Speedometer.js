import React from "react";
import GaugeChart from 'react-gauge-chart';
import SideNav from './SideNav';

const Speedometer = (props) => {
  return(
      <div style={{ backgroundColor: '#282c34' }}>
        <GaugeChart
            id="speedometer-gauge"
            nrOfLevels={20}
            percent={0.86}
            animDelay={0.5}
        />
      </div>
  );
}

export default Speedometer;
