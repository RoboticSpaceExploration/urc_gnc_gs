import React from "react";
import GaugeChart from 'react-gauge-chart';
import ROSConfig from '../scripts/ROSConfig';
import { useState, useEffect } from "react";
import { init_ros_connection } from '../ROSConnection';


function Speedometer(props) {

  const cmdVelTopic = new window.ROSLIB.Topic({
    ros: init_ros_connection.ros,
    name: init_ros_connection.cmd_vel_topic,
    messageType: "geometry_msgs/Twist",
  });

  const [linSpeed, setLinSpeed] = useState(0);

  const updateLinSpeed = (newSpeed) => {
    setLinSpeed(newSpeed);

    const message = new window.ROSLIB.Message({
      linear: { x: newSpeed, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: 0 },
    });

    cmdVelTopic.publish(message);
  };

  useEffect(() => {
    const linSpeedTopic = new window.ROSLIB.Topic({
      ros: init_ros_connection.ros,
      name: "/lin_speed", 
      messageType: "std_msgs/Float32",
    });

    linSpeedTopic.subscribe((message) => {
      setLinSpeed(message.data);
    });

    return () => {
      linSpeedTopic.unsubscribe();
    };
  }, []);


  return(
        <div style={{ backgroundColor: '#282c34' }}>
          <GaugeChart
              id="speedometer-gauge"
              nrOfLevels={20}
              percent={linSpeed / 100}
              animDelay={0.5}
          />
        </div>
        
  );
}

export default Speedometer;
