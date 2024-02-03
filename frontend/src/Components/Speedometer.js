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
            { limit: 0, color: "#FFFFFF" },
            { limit: 3, color: "#FFFFFF" },
            { limit: 6, color: "#FFFFFF" },
            { limit: 9, color: "#FFFFFF" },
            { limit: 12, color: "#DC405C" },
          ],
        }}
        labels={{
          valueLabel: {
            style: {fontSize: "30px"},
            formatTextValue: (value) => `${value} mph`,
          },
          tickLabels: {
            type: "inner",
            ticks: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
            ].map((value) => ({ value })),
          },
        }}
        value={linSpeed}
        maxValue={12}
      />
    </div>
  
  );
}

export default Speedometer;
