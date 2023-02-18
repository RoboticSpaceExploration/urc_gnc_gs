import React, { useState } from 'react';
import { Alert, Row, Container } from 'react-bootstrap';
import { init_ros_connection } from '../ROSConnection';

const Controls = () => {
  const [keyA, setKeyA] = useState(false);
  const [keyS, setKeyS] = useState(false);
  const [keyD, setKeyD] = useState(false);
  const [keyW, setKeyW] = useState(false);
  const cmd_vel = new window.ROSLIB.Topic({
    ros: init_ros_connection.ros,
    name: init_ros_connection.cmd_vel_topic,
    messageType: "geometry_msgs/Twist",
  });
  let message = {};

  window.addEventListener("keydown", onKeyDown, { passive: false});
  window.addEventListener("keyup", onKeyUp, { passive: false});

  /////////////////////////
  // Movement control
  /////////////////////////
  function forward() {
    message = new window.ROSLIB.Message({
        linear: { x: 1, y: 0, z: 0, },
        angular: { x: 0, y: 0, z: 0, },
    })

    //setMessage(message);
    console.log(message);
    //Call velocity topic from ROS connection
    cmd_vel.publish(message);
    console.log('forward');
  };

  function backward() {
    message = new window.ROSLIB.Message({
      linear: { x: -1, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: 0, },
  })

    //setMessage(message);
      console.log(message);
      //Call velocity topic from ROS connection
      cmd_vel.publish(message);
      console.log('back');
  };

  function turnLeft() {
    message = new window.ROSLIB.Message({
      linear: { x: 0.0, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: 1, },
  })

    //setMessage(message);
     console.log(message);
      //Call velocity topic from ROS connection
      cmd_vel.publish(message);
      console.log("left");
  };

  function turnRight() {
    message = new window.ROSLIB.Message({
      linear: { x: 0.0, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: 1, },
  })

    // setMessage(message);
      console.log(message);
      //Call velocity topic from ROS connection
      cmd_vel.publish(message);
      console.log("right");
  };

  function stop() {
    message = new window.ROSLIB.Message({
      linear: { x: 0, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: 0, },
  })

    // setMessage(message);
      console.log(message);
      //Call velocity topic from ROS connection
      cmd_vel.publish(message);
      console.log("stop");
  };

  ///////////////////////////
  // Speed control
  ///////////////////////////
  function fastLinSpeed() {
    message = new window.ROSLIB.Message({
      speed: {linear:1.1, angular:1.1, },
  })

    // setMessage(message);
      console.log(message);
      //Call velocity topic from ROS connection
      cmd_vel.publish(message);
      console.log("going faster - linear");
  };


  ///////////////////////////
  // Keyboard listener
  ///////////////////////////
  function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68: //d turn right
        setKeyD(true)
        turnRight();
        break;
      case 83: //s move backward
        setKeyS(true)
        backward();
        break;
      case 65: //a turn left
        setKeyA(true)
        turnLeft();
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
    event.stopImmediatePropagation();
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

    stop();
    event.stopImmediatePropagation();
  }


  return (
      <div>
        <Container style={{ textAlign: 'center', marginTop: '20vh' }}>
        <Row style={{ justifyContent: 'center', alignContent: 'center' }}>
          <Alert variant={keyW ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: 0 }}>W</Alert>
        </Row>

        <Row style={{ justifyContent: 'center' }}>
            <Alert variant={keyA ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: '20px' }}>A</Alert>
            <Alert variant={keyS ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: 0 }}>S</Alert>
            <Alert variant={keyD ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: '20px', marginRight: 0 }}>D</Alert>
        </Row>
        </Container>
      </div>
  );
}

export default Controls;
