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
                  { limit: 1, color: "#FFFFFF"},
                  { limit: 2, color: "#FFFFFF"},
                  { limit: 3, color: "#FFFFFF"},
                  { limit: 4, color: "#FFFFFF"},
                  { limit: 5, color: "#dc405c"},
                ]
              }}
              labels={{
                valueLabel: {
                  fontSize: 40,
                  formatTextValue: value => value + " m/s"
                },
                tickLabels: {
                  type: "inner",
                  ticks: [
                    { value: 0.5 },
                    { value: 1 },
                    { value: 1.5 },
                    { value: 2 },
                    { value: 2.5 },
                    { value: 3 },
                    { value: 3.5 },
                    { value: 4 },
                    { value: 4.5 },
                    { value: 5 }
                  ],
                }
              }}
              value={linSpeed}
              maxValue={5}
          />
        </div>
  );
}

export default Speedometer;
