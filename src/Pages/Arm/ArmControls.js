import React, {useState} from 'react';
import ArmCad from "../../Images/arm-cad.png";
import {Button, ButtonGroup, Image, Row} from "react-bootstrap";
import Shoulder from '../../Images/shoulder_outline.png';
import EE from '../../Images/EE_outline.png';
import Forearm from '../../Images/forearm_outline.png';
import Gearbox from '../../Images/gearbox_outline.png';
import Grip from '../../Images/grip_outline.png';
import Wrist from '../../Images/wrist_outline.png';
import { init_ros_connection } from '../../ROSConnection';

const ArmControls = () => {
    const [shoulder, setShoulder] = useState(false);
    const [ee,       setEE]       = useState(false);
    const [forearm,  setForearm]  = useState(false);
    const [gearbox,  setGearbox]  = useState(false);
    const [grip,     setGrip]     = useState(false);
    const [wrist,    setWrist]    = useState(false);
    const cmd_vel = new window.ROSLIB.Topic({
        ros: init_ros_connection.ros,
        // name: init_ros_connection.arm_cmd_topics.joint1,
        messageType: "std_msgs/Float64",
      });
      let message = {};
      // let linSpeed = 1;
      // let angSpeed = 0.5;


    const imageStyle = { width: '80wh', position: 'absolute'};

    /////////////////////////
    // Movement control
    /////////////////////////

    // function up() {
    //     message = new window.ROSLIB.Message({
    //         linear: { x: linSpeed, y: 0, z: 0, },
    //         angular: { x: 0, y: 0, z: 0, },
    //     })
    //
    //     //Call velocity topic from ROS connection
    //     cmd_vel.publish(message);
    //   };
    //
    //   function down() {
    //     message = new window.ROSLIB.Message({
    //       linear: { x: -linSpeed, y: 0, z: 0, },
    //       angular: { x: 0, y: 0, z: 0, },
    //   })
    //
    //       //Call velocity topic from ROS connection
    //       cmd_vel.publish(message);
    //   };

    const ArmControlButtons = ({ top, left, number }) => {
        const buttonStyle = { width: 100, height: 50, top: top, left: left, position: 'absolute' };

        const handleEvent = (event) => {
            let motorID = event.currentTarget.id;
            if (event.type === "mousedown") {
                if (motorID === '1-up') {
                    setShoulder(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint1;
                    message = new window.ROSLIB.Message({effort: 0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                } else if (motorID === '1-down') {
                    setShoulder(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint1;
                    message = new window.ROSLIB.Message({effort: -0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                } else if (motorID === '2-up') {
                    setForearm(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint2;
                    message = new window.ROSLIB.Message({effort: 0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                } else if (motorID === '2-down') {
                    setForearm(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint2;
                    message = new window.ROSLIB.Message({effort: -0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                } else if (motorID === '3-up') {
                    setWrist(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint3;
                    message = new window.ROSLIB.Message({effort: 0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                } else if (motorID === '3-down') {
                    setWrist(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint3;
                    message = new window.ROSLIB.Message({effort: -0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                } else if (motorID === '4-up') {
                    setGearbox(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint4;
                    message = new window.ROSLIB.Message({effort: 0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                } else if (motorID === '4-down') {
                    setGearbox(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint4;
                    message = new window.ROSLIB.Message({effort: -0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                } else if (motorID === '5-up') {
                    setEE(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint5;
                    message = new window.ROSLIB.Message({effort: 0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                } else if (motorID === '5-down') {
                    setEE(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint5;
                    message = new window.ROSLIB.Message({effort: -0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                } else if (motorID === '6-up') {
                    setGrip(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint6;
                    message = new window.ROSLIB.Message({effort: 0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                } else if (motorID === '6-down'){
                    setGrip(true);
                    cmd_vel.name = init_ros_connection.arm_cmd_topics.joint6;
                    message = new window.ROSLIB.Message({effort: -0.99});
                    console.log(message);
                    console.log(cmd_vel);
                    cmd_vel.publish(message);
                }
                // if (number === 2) {
                //     setForearm(true);
                // }
                // if (number === 3) {
                //     setWrist(true);
                // }
                // if (number === 4) {
                //     setGearbox(true);
                // }
                // if (number === 5) {
                //     setEE(true);
                // }
                // if (number === 6) {
                //     setGrip(true);
                // }
            } else {
                setShoulder(false);
                setWrist(false);
                setGearbox(false);
                setGrip(false);
                setEE(false);
                setForearm(false);
            }
        }

        // moveJoint(id) {
        //     if (id == 1) {
        //         setShoulder(true);
        //     }
        // }

        return (
            <ButtonGroup vertical style={buttonStyle}>
                <Button variant='outline-dark' id={`${number}-up`} onMouseDown={(e) => handleEvent(e)} onMouseUp={(e) => handleEvent(e)}>
                    <h3><i className="fa-solid fa-angle-up" /></h3>
                </Button>
                <Button variant='outline-dark' id={`${number}-down`} onMouseDown={(e) => handleEvent(e)} onMouseUp={(e) => handleEvent(e)}>
                    <h3><i className="fa-solid fa-angle-down" /></h3>
                </Button>
            </ButtonGroup>
        )
    }

    return (
        <Row style={{ margin: 0, paddingTop: 100 }}>
            <Image src={ArmCad} style={imageStyle}/>
            {shoulder ? <Image src={Shoulder} style={imageStyle}/> : ''}
            {forearm ? <Image src={Forearm} style={imageStyle}/> : ''}
            {wrist ? <Image src={Wrist} style={imageStyle}/> : ''}
            {gearbox ? <Image src={Gearbox} style={imageStyle}/> : ''}
            {ee ? <Image src={EE} style={imageStyle}/> : ''}
            {grip ? <Image src={Grip} style={imageStyle}/> : ''}
            <ArmControlButtons top={500} left={0} number={1}/>
            <ArmControlButtons top={200} left={300} number={2}/>
            <ArmControlButtons top={50} left={700} number={3}/>
            <ArmControlButtons top={400} left={1000} number={4}/>
            <ArmControlButtons top={50} left={1350} number={5}/>
            <ArmControlButtons top={550} left={1250} number={6}/>

        </Row>
    )
}

export default ArmControls;
