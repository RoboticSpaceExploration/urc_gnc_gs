import React, { useState } from 'react';
import { Alert, Row, Container } from 'react-bootstrap';
import Config from '../scripts/config';
import { init_ros_connection } from '../ROSConnection';
import RoverDataDropdown from './RoverDataDropdown';

const Controls = () => {
  const [keyA, setKeyA] = useState(false);
  const [keyS, setKeyS] = useState(false);
  const [keyD, setKeyD] = useState(false);
  const [keyW, setKeyW] = useState(false);
  const [keyI, setKeyI] = useState(false);
  const [keyU, setKeyU] = useState(false);
  const [keyJ, setKeyJ] = useState(false);
  const [keyK, setKeyK] = useState(false);
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

    var cmd_vel = new window.ROSLIB.Topic({
      ros: init_ros_connection.ros,
      name: init_ros_connection.cmd_vel_topic,
      messageType: "geometry_msgs/Twist",

  }); 

    let message = new window.ROSLIB.Message({
      linear: { x: -0.15, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: 0, },
  })

    setMessage(message);
      console.log(newMessage);
      //Call velocity topic from ROS connection 
      cmd_vel.publish(newMessage);
  };

  function turnLeft() {

    var cmd_vel = new window.ROSLIB.Topic({
      ros: init_ros_connection.ros,
      name: init_ros_connection.cmd_vel_topic,
      messageType: "geometry_msgs/Twist",

  }); 

    let message = new window.ROSLIB.Message({
      linear: { x: 0.0, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: 0.2, },
  })

    setMessage(message);
      console.log(newMessage);
      //Call velocity topic from ROS connection 
      cmd_vel.publish(newMessage);
  };

  function turnRight() {

    var cmd_vel = new window.ROSLIB.Topic({
      ros: init_ros_connection.ros,
      name: init_ros_connection.cmd_vel_topic,
      messageType: "geometry_msgs/Twist",

  }); 

    let message = new window.ROSLIB.Message({
      linear: { x: 0.0, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: -0.2, },
  })

    setMessage(message);
      console.log(newMessage);
      //Call velocity topic from ROS connection 
      cmd_vel.publish(newMessage);
  };

  function stop() {

    var cmd_vel = new window.ROSLIB.Topic({
      ros: init_ros_connection.ros,
      name: init_ros_connection.cmd_vel_topic,
      messageType: "geometry_msgs/Twist",

  }); 

    let message = new window.ROSLIB.Message({
      linear: { x: 0, y: 0, z: 0, },
      angular: { x: 0, y: 0, z: 0, },
  })

    setMessage(message);
      console.log(newMessage);
      //Call velocity topic from ROS connection 
      cmd_vel.publish(newMessage);
  };


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
      case 73:
        setKeyI(true);
        break;
      case 74:
        setKeyJ(true);
        break;
      case 75:
        setKeyK(true);
        break;
      case 85:
        setKeyU(true);
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

  }

  
  return (
      <div>
        <RoverDataDropdown dataType="Controls"/>
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