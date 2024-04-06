import React, { useEffect, useState } from "react";
import {init_ros_connection} from "../ROSConnection";

function GPSCoordinates(props) {
    const [latitude, setLatitude] = useState(0.00);
    const [longitude, setLongitude] = useState(0.00);

    const listener = new window.ROSLIB.Topic({
        ros: init_ros_connection.ros,
        name: '/gps/fix',
        messageType: 'sensor_msgs/NavSatFix',
    })

    useEffect(() => {
        listener.subscribe(function(message) {
            setLatitude(message.latitude);
            setLongitude(message.longitude);
            listener.unsubscribe();
        })
    })

    return (
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <p><strong>Longitude:  </strong>{latitude}</p>
              <p><strong>Latitude: </strong>{longitude}</p>
          </div>
    );
};

export default GPSCoordinates;
