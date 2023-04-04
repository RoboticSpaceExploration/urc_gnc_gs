import React, { useState, useEffect } from 'react';
import { Alert, Row, Container } from 'react-bootstrap';
import { init_ros_connection } from '../ROSConnection';

const Controls = () => {
  const [keyA, setKeyA] = useState(false);
  const [keyS, setKeyS] = useState(false);
  const [keyD, setKeyD] = useState(false);
  const [keyW, setKeyW] = useState(false);
  const [keyU, setKeyU] = useState(false);
  const [keyJ, setKeyJ] = useState(false);
  const [keyI, setKeyI] = useState(false);
  const [keyK, setKeyK] = useState(false);
  const cmd_vel = new window.ROSLIB.Topic({
    ros: init_ros_connection.ros,
    name: init_ros_connection.cmd_vel_topic,
    messageType: "geometry_msgs/Twist",
  });
  let message = {};
  let linSpeed = 1;
  let angSpeed = 0.5;

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown, {capture: true, passive: false});
    window.addEventListener("keyup", onKeyUp, {capture: true, passive: false});
  })


  /////////////////////////
  // Movement control
  /////////////////////////
  function forward() {
    message = new window.ROSLIB.Message({
        linear: { x: linSpeed, y: 0, z: 0, },
        angular: { x: 0, y: 0, z: 0, },
    })

    //Call velocity topic from ROS connection
    cmd_vel.publish(message);
  };

  function backward() {
    message = new window.ROSLIB.Message({
      linear: { x: -linSpeed, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: 0, },
  })

      //Call velocity topic from ROS connection
      cmd_vel.publish(message);
  };

  function turnLeft() {
    message = new window.ROSLIB.Message({
      linear: { x: 0.0, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: angSpeed, },
  })

      //Call velocity topic from ROS connection
      cmd_vel.publish(message);
  };

  function turnRight() {
    message = new window.ROSLIB.Message({
      linear: { x: 0.0, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: -angSpeed, },
  })

      //Call velocity topic from ROS connection
      cmd_vel.publish(message);
  };

  function stop() {
    message = new window.ROSLIB.Message({
      linear: { x: 0, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: 0, },
  })

      //Call velocity topic from ROS connection
      cmd_vel.publish(message);
  };

  ///////////////////////////
  // Speed control
  ///////////////////////////
  function incLinSpeed() {
    linSpeed *= 1.1;
    console.log(linSpeed);
  };

  function decLinSpeed() {
    linSpeed *= 0.9;
    console.log(linSpeed);
  };

  function incAngSpeed() {
    angSpeed *= 1.1;
    console.log(angSpeed);
  };

  function decAngSpeed() {
    angSpeed *= 0.9;
    console.log(angSpeed);
  };

  ///////////////////////////
  // Keyboard listener
  ///////////////////////////
  function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68: //d turn right
        turnRight();
        setKeyD(true)
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
      case 85: //u fast lin speed
        setKeyU(true)
        incLinSpeed();
        break;
      case 74: //j slow lin speed
        setKeyJ(true)
        decLinSpeed();
        break;
      case 73: //i fast ang speed
        setKeyI(true)
        incAngSpeed();
        break;
      case 75: //k slow ang speed
        setKeyK(true)
        decAngSpeed();
        break;
      default:
        setKeyW(false)
        setKeyA(false)
        setKeyS(false)
        setKeyD(false)
        setKeyI(false)
        setKeyU(false)
        setKeyK(false)
        setKeyJ(false)
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
      case 73:
        setKeyI(false);
        break;
      case 74:
        setKeyJ(false);
        break;
      case 75:
        setKeyK(false);
        break;
      case 85:
        setKeyU(false);
        break;
      default:
        setKeyW(false)
        setKeyA(false)
        setKeyS(false)
        setKeyD(false)
        setKeyI(false)
        setKeyU(false)
        setKeyK(false)
        setKeyJ(false)
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

        <Row>
          <Alert variant={keyU ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: '20px' }}>U</Alert>
          <Alert variant={keyI ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: 0 }}>I</Alert>
          <Alert variant={keyJ ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: '20px', marginRight: 0 }}>J</Alert>
          <Alert variant={keyK ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: '20px', marginRight: 0 }}>K</Alert>
        </Row>
        </Container>
      </div>
  );
}

export default Controls;
