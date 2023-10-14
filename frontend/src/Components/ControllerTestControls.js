import React, { useState, useEffect } from 'react';
import {useGamepads} from 'react-gamepads';
import { Alert, Row, Container, Col } from 'react-bootstrap';
import { init_ros_connection } from '../ROSConnection';

function ControllerTestControls() {
    const [gamepads, setGamepads] = useState({});
    useGamepads(gamepads => setGamepads(gamepads));
    const cmd_vel = new window.ROSLIB.Topic({
        ros: init_ros_connection.ros,
        name: init_ros_connection.cmd_vel_topic,
        messageType: "geometry_msgs/Twist",
    });
    let message = {};
    let linSpeed = 1;
    let angSpeed = 0.5;

    useEffect(() => {
        window.addEventListener("buttondown", onButtonPress, {capture: true, passive: false});
        window.addEventListener("buttonup", onButtonRelease, {capture: true, passive: false});
    })

    /////////////////////////
    // Movement control
    /////////////////////////
    function forward() {
        message = new window.ROSLIB.Message({
            linear: { x: linSpeed, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })

        console.log(cmd_vel);
        console.log(message);
        //Call velocity topic from ROS connection
        cmd_vel.publish(message);
    };

    function backward() {
        message = new window.ROSLIB.Message({
            linear: { x: -linSpeed, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })

        console.log(message);
        //Call velocity topic from ROS connection
        cmd_vel.publish(message);
    };

    function turnLeft() {
        message = new window.ROSLIB.Message({
            linear: { x: 0.0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: angSpeed, },
        })

        console.log(message);
        //Call velocity topic from ROS connection
        cmd_vel.publish(message);
    };

    function turnRight() {
        message = new window.ROSLIB.Message({
            linear: { x: 0.0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: -angSpeed, },
        })

        console.log(message);
        //Call velocity topic from ROS connection
        cmd_vel.publish(message);
    };

    function stop() {
        message = new window.ROSLIB.Message({
            linear: { x: 0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })

        console.log(message);
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
    // Controller Listener
    ///////////////////////////
    function onButtonPress(event) {
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

    function onButtonRelease(event) {
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
                <Row>
                    <Col style={{textAlign:'center'}}>
                        <h3>Teleoperation Control</h3>
                        <Row style={{ justifyContent: 'center', alignContent: 'center' }}>
                            <Alert variant={keyW ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 0, marginRight: 0 }}>Dpad-UP</Alert>
                        </Row>
                        <Row style={{ justifyContent: 'center' }}>
                            <Alert variant={keyA ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 0, marginRight: '10px' }}>Dpad-LEFT</Alert>
                            <Alert variant={keyS ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 0, marginRight: 0 }}>Dpad-DOWN</Alert>
                            <Alert variant={keyD ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: '10px', marginRight: 0 }}>Dpad-RIGHT</Alert>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h3>Linear Speed</h3>
                                <Row>
                                    <Alert variant={keyU ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 0, marginRight: 0}}>A</Alert>
                                </Row>
                                <Row>
                                    <Alert variant={keyJ ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 0, marginRight: 0 }}>B</Alert>
                                </Row>
                            </Col>
                            <Col>
                                <h3>Angular Speed</h3>
                                <Row>
                                    <Alert variant={keyI ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 0, marginRight: 0 }}>X</Alert>
                                </Row>
                                <Row>
                                    <Alert variant={keyK ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 0, marginRight: 0 }}>Y</Alert>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default ControllerTestControls;
