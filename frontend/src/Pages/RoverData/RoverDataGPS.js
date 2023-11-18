import React from "react";
import GPSCoordinates from "../../Components/GPSCoordinates";

class RoverDataGPS extends React.Component {
  render() {
    return (
        <div id="rover-data-gps">
            <GPSCoordinates/>
        </div>
    );
  }
}

export default RoverDataGPS;
