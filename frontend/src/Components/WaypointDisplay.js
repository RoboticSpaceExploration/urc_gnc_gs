import React from 'react';
import WaypointFeed from './WaypointFeed';
import { Button } from 'react-bootstrap';

function WaypointDisplay({ waypointData }) {

  return (
      <div>
        {waypointData && waypointData.length > 0 ? (
            waypointData.map((waypoint, index) => (
                <WaypointFeed
                    type={waypoint.type}
                    position={waypoint.position}
                    visited={waypoint.visited}
                    visible={waypoint.visible}
                    index={index+1}
                    id={waypoint.id}/>
            ))
        ) : (
            <p style={{ textAlign: 'center' }}>Waypoint List is Empty</p>
        )}
      </div>
  );
}

export default WaypointDisplay;