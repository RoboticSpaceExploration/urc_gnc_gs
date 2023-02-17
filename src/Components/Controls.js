import React, { useState, KeyboardEvent } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import Config from '../scripts/config';
import { init_ros_connection } from '../ROSConnection';

const Controls = () => {
  const [keyA, setKeyA] = useState(false);
  const [keyS, setKeyS] = useState(false);
  const [keyD, setKeyD] = useState(false);
  const [keyW, setKeyW] = useState(false);
  const [newMessage, setMessage] = useState(null);

  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);
  
  function forward() {

    var cmd_vel = new window.ROSLIB.Topic({
      ros: init_ros_connection.ros,
      name: init_ros_connection.cmd_vel_topic,
      messageType: "geometry_msgs/Twist",

  }); 

    let message = new window.ROSLIB.Message({
        linear: { x: 0.15, y: 0, z: 0, },
        angular: { x: 0, y: 0, z: 0, },
    })

    setMessage(message);
    console.log(newMessage);
    //Call velocity topic from ROS connection 
    cmd_vel.publish(newMessage);
  };

  function backward() {
    let message = new window.ROSLIB.Message({
      linear: { x: 0.15, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: 0, },
  })

  setMessage(newMessage);
  //Call velocity topic from ROS connection 
  
  // this.topic.publish(newMessage)
    };


  function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68: //d turn right
        setKeyD(true)

        break;
      case 83: //s move backward
        setKeyS(true)

        break;
      case 65: //a turn left
        setKeyA(true)

        break;
      case 87: //w move forward
        setKeyW(true)
        forward();
        break;
      default:
        setKeyW(false)
        setKeyA(false)
        setKeyS(false)
        setKeyD(false)
        break;
    }
  }

  function onKeyUp(event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
      case 68: //d
        setKeyD(false)

        break;
      case 83: //s
        setKeyS(false)

        break;
      case 65: //a
        setKeyA(false)

        break;
      case 87: //w
        setKeyW(false)

        break;
      default:
        setKeyW(false)
        setKeyA(false)
        setKeyS(false)
        setKeyD(false)
        break;
    }
  }

  
  return (
      <div style={{ textAlign: 'center', width: '80%', marginTop: '40vh', marginLeft: 0 }}>
        <Row style={{ justifyContent: 'center' }}>
          <Alert variant={keyW ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: 0 }}>W</Alert>
        </Row>

        <Row style={{ justifyContent: 'center', display: 'inline-flex' }}>
            <Alert variant={keyA ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: '20px' }}>A</Alert>
            <Alert variant={keyS ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: 0 }}>S</Alert>
            <Alert variant={keyD ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: '20px', marginRight: 0 }}>D</Alert>
        </Row>
      </div>
  );
}

export default Controls;