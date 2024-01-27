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
                width: 0.05

              }}
              value={3}
          />
        </div>
  );
}

export default Speedometer;
