import React from "react";
import RoverDataDropdown from "../../Components/RoverDataDropdown";
import Speedometer from "../../Components/Speedometer";

class RoverDataSpeed extends React.Component {
  render() {
    return (
        <div id="rover-data-speed">
          <RoverDataDropdown dataType="Speedometer"/>
          <Speedometer/>
        </div>
    )
  }
}

export default RoverDataSpeed;
