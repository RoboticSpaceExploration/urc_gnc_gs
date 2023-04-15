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
        name: init_ros_connection.arm_cmd_topics.joint1,
        messageType: "std_msgs/Float64",
      });
      let message = {};
      //let linSpeed = 1;

    const imageStyle = { width: '80wh', position: 'absolute'};

    /////////////////////////
    // Arm movement control
    /////////////////////////

    function up(topic_name) {
        cmd_vel.name = topic_name;
        message = new window.ROSLIB.Message({data: 40});
        console.log(message);
        console.log(cmd_vel);
        cmd_vel.publish(message);
    }
    function down(topic_name){
        cmd_vel.name = topic_name;
        message = new window.ROSLIB.Message({data: -40});
        console.log(message);
        console.log(cmd_vel);
        cmd_vel.publish(message);
    }
    function stop(topic_name) {
        cmd_vel.name = topic_name;
        message = new window.ROSLIB.Message({data: 0});
        console.log(message);
        console.log(cmd_vel);
        cmd_vel.publish(message);
      };

    const ArmControlButtons = ({ top, left, number }) => {
        const buttonStyle = { width: 100, height: 50, top: top, left: left, position: 'absolute' };

        const handleEvent = (event) => {
            let motorID = event.currentTarget.id;
            if (event.type === "mousedown") {
                if (motorID === '1-up') {
                    setShoulder(true);
                    up(init_ros_connection.arm_cmd_topics.joint1);
                } else if (motorID === '1-down') {
                    setShoulder(true);
                    down(init_ros_connection.arm_cmd_topics.joint1);
                } else if (motorID === '2-up') {
                    setForearm(true);
                    up(init_ros_connection.arm_cmd_topics.joint2);
                } else if (motorID === '2-down') {
                    setForearm(true);
                    down(init_ros_connection.arm_cmd_topics.joint2);
                } else if (motorID === '3-up') {
                    setWrist(true);
                    up(init_ros_connection.arm_cmd_topics.joint3);
                } else if (motorID === '3-down') {
                    setWrist(true);
                    down(init_ros_connection.arm_cmd_topics.joint3);
                } else if (motorID === '4-up') {
                    setGearbox(true);
                    up(init_ros_connection.arm_cmd_topics.joint4);
                } else if (motorID === '4-down') {
                    setGearbox(true);
                    down(init_ros_connection.arm_cmd_topics.joint4);
                } else if (motorID === '5-up') {
                    setEE(true);
                    up(init_ros_connection.arm_cmd_topics.joint5);
                } else if (motorID === '5-down') {
                    setEE(true);
                    down(init_ros_connection.arm_cmd_topics.joint5);
                } else if (motorID === '6-up') {
                    setGrip(true);
                    up(init_ros_connection.arm_cmd_topics.joint6);
                } else if (motorID === '6-down'){
                    setGrip(true);
                    down(init_ros_connection.arm_cmd_topics.joint6);
                }

                //event.stopImmediatePropagation();
            } else if (event.type === "mouseup"){
                setShoulder(false);
                setWrist(false);
                setGearbox(false);
                setGrip(false);
                setEE(false);
                setForearm(false);
                if (motorID === '1-up') {
                    stop(init_ros_connection.arm_cmd_topics.joint1);
                } else if (motorID === '1-down') {
                    stop(init_ros_connection.arm_cmd_topics.joint1);
                } else if (motorID === '2-up') {
                    stop(init_ros_connection.arm_cmd_topics.joint2);
                } else if (motorID === '2-down') {
                    stop(init_ros_connection.arm_cmd_topics.joint2);
                } else if (motorID === '3-up') {
                    stop(init_ros_connection.arm_cmd_topics.joint3);
                } else if (motorID === '3-down') {
                    stop(init_ros_connection.arm_cmd_topics.joint3);
                } else if (motorID === '4-up') {
                    stop(init_ros_connection.arm_cmd_topics.joint4);
                } else if (motorID === '4-down') {
                    stop(init_ros_connection.arm_cmd_topics.joint4);
                } else if (motorID === '5-up') {
                    stop(init_ros_connection.arm_cmd_topics.joint5);
                } else if (motorID === '5-down') {
                    stop(init_ros_connection.arm_cmd_topics.joint5);
                } else if (motorID === '6-up') {
                    stop(init_ros_connection.arm_cmd_topics.joint6);
                } else if (motorID === '6-down'){
                    stop(init_ros_connection.arm_cmd_topics.joint6);
                }

                //event.stopImmediatePropagation();
            }

        }

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
