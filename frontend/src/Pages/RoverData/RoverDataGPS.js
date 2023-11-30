import React from "react";
import GPSCoordinates from "../../Components/GPSCoordinates";

class RoverDataGPS extends React.Component {
  render() {
    return (
        <div id="rover-data-gps">
            <h3 style={{ textAlign: "center" }}>Location</h3>
            <GPSCoordinates/>
        </div>
    );
  }
}

export default RoverDataGPS;
