import React from "react";
import { Alert } from 'react-bootstrap';

function GPSCoordinates(props) {
    return (
          <div style={{ display: 'inline-block' }}>
            <Alert variant="dark">
              <p><strong>Longitude:  </strong>[longitude goes here]</p>
              <p><strong>Latitude: </strong>[latitude goes here]</p>
            </Alert>
          </div>
    );
};

export default GPSCoordinates;
