import React, {useEffect, useState} from "react";
import GaugeChart from 'react-gauge-chart';
import GaugeComponent from 'react-gauge-component'
import axios from "axios";

function Speedometer(props) {
    const [linSpeed, setLinSpeed] = useState(0);

    useEffect(() => {
        const fetch = () => {
            axios({
                method: "GET",
                url: "http://localhost:9000/linSpeed",
            })
                .then((response) => {
                    const res = response.data;
                    setLinSpeed(res);
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                });
        };

        fetch();

        const intervalId = setInterval(fetch, 250);
        return () => clearInterval(intervalId);

    });
  return(
    <div style={{ backgroundColor: '#282c34' }}>
      <GaugeComponent
        id="speedometer-gauge"
        arc={{
          width: 0.15,
          padding: 0.02,
          subArcs: [
            { limit: 1, color: "#FFFFFF" },
            { limit: 2, color: "#FFFFFF" },
            { limit: 3, color: "#FFFFFF" },
            { limit: 4, color: "#FFFFFF" },
            { limit: 5, color: "#DC405C" },
          ],
        }}
        labels={{
          valueLabel: {
            fontSize: 40,
            formatTextValue: (value) => `${value} m/s`,
          },
          tickLabels: {
            type: "inner",
            ticks: [
              0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5,
            ].map((value) => ({ value })),
          },
        }}
        value={linSpeed}
        maxValue={5}
      />
    </div>
  
  );
}

export default Speedometer;
