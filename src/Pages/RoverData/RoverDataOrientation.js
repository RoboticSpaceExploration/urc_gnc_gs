import React from "react";
import RoverDataDropdown from "../../Components/RoverDataDropdown";
import Compass from "../../Components/Compass";

class RoverDataOrientation extends React.Component {
  render() {
    return (
        <div>
        <RoverDataDropdown />
        <Compass/>
        </div>
    );
  }
}

export default RoverDataOrientation;
