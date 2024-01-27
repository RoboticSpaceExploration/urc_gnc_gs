import React from 'react';
import WaypointFeed from './WaypointFeed';
import { Button } from 'react-bootstrap';

function WaypointDisplay({ waypointData }) {

  return (
      <div>
        {waypointData && waypointData.length > 0 ? (
            waypointData.map((waypoint) => (
                <WaypointFeed
                    type={waypoint.type}
                    position={waypoint.position}
                    visited={waypoint.visited}
                    visible={waypoint.visible}
                    id={waypoint.id}/>
            ))
        ) : (
            <p style={{ textAlign: 'center' }}>Waypoint Lis is Empty</p>
        )}
      </div>
  );
}

export default WaypointDisplay;