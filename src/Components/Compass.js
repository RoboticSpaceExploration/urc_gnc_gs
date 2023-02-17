import React from "react";
import RoverDataDropdown from './RoverDataDropdown';

const Compass = () => {
    return (
        <div>
          <RoverDataDropdown dataType="Compass"/>
            <div className="compass">
              <div className="arrow"></div>
              <div className="compass-circle"></div>
              <div className="my-point"></div>
            </div>
        </div>
    );
}

export default Compass;