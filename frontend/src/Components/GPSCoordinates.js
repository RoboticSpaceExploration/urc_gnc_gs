import React from "react";

function GPSCoordinates(props) {
    return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <p><strong>Longitude:  </strong>[longitude goes here]</p>
              <p><strong>Latitude: </strong>[latitude goes here]</p>
          </div>
    );
};

export default GPSCoordinates;
