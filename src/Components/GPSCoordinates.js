import React from "react";
import { Alert } from 'react-bootstrap';
import RoverDataDropdown from './RoverDataDropdown';

const GPSCoordinates = (props) => {
    return (
        <div>
          <RoverDataDropdown dataType="GPS Coordinates" />
          <div style={{ display: 'inline-block' }}>
            <Alert variant="dark">
              <p><strong>Longitude:  </strong>[longitude goes here]</p>
              <p><strong>Latitude: </strong>[latitude goes here]</p>
            </Alert>
          </div>
        </div>
    );
};

export default GPSCoordinates;