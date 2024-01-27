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
                nbSubArcs: 150,
                colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
                width: 0.025,
                padding: 0.003
              }}
              labels={{
                valueLabel: {
                  fontSize: 40,
                  formatTextValue: value => value + 'm/s'
                },
                tickLabels: {
                  type: "outer",
                  ticks: [
                    { value: 100 },
                    { value: 200 },
                    { value: 300 },
                    { value: 400 },
                    { value: 500 },
                    { value: 600 },
                    { value: 700 },
                    { value: 800 },
                    { value: 900 },
                    { value: 1000 },
                    { value: 1500 },
                    { value: 2000 },
                    { value: 2500 },
                    { value: 3000 },
                  ],
                  valueConfig: {
                    formatTextValue: value => value + 'm/s'
                  }
                }
              }}
              value={linSpeed}
              maxValue={3000}
          />
        </div>
  );
}

export default Speedometer;
