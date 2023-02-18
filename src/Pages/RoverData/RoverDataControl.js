import React from "react";
import RoverDataDropdown from "../../Components/RoverDataDropdown";
import Controls from "../../Components/Controls";

class RoverDataControl extends React.Component {
  render() {
    return (
        <div id="rover-data-controls">
          <RoverDataDropdown/>
          <Controls/>
        </div>
    );
  }
}

export default RoverDataControl;
