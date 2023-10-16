import React from "react";
import { Alert } from 'react-bootstrap';

function GPSCoordinates(props) {
    return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p><strong>Longitude:  </strong>[longitude goes here]</p>
              <p><strong>Latitude: </strong>[latitude goes here]</p>
          </div>
    );
};

export default GPSCoordinates;
