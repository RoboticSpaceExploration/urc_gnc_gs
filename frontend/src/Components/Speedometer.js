import React, {useEffect, useState} from "react";
import GaugeChart from 'react-gauge-chart';
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
          <GaugeChart
              id="speedometer-gauge"
              nrOfLevels={20}
              percent={linSpeed / 100}
              animDelay={0.5}
          />
        </div>
  );
}

export default Speedometer;
