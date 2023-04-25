import React, {useState, useEffect, useCallback} from 'react';
import ArmCad from "../../Images/arm-cad.png";
import {Button, ButtonGroup, Image, Row} from "react-bootstrap";
import Shoulder from '../../Images/shoulder_outline.png';
import EE from '../../Images/EE_outline.png';
import Forearm from '../../Images/forearm_outline.png';
import Gearbox from '../../Images/gearbox_outline.png';
import Grip from '../../Images/grip_outline.png';
import Wrist from '../../Images/wrist_outline.png';
import { init_ros_connection } from '../../ROSConnection';

function ArmControls() {
    const [shoulder, setShoulder] = useState(false);
    const [ee,       setEE]       = useState(false);
    const [forearm,  setForearm]  = useState(false);
    const [gearbox,  setGearbox]  = useState(false);
    const [grip,     setGrip]     = useState(false);
    const [wrist,    setWrist]    = useState(false);
    const [dimensions,    setDimensions]    = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const cmd_arm = new window.ROSLIB.Topic({
        ros: init_ros_connection.ros,
        messageType: "std_msgs/Float64",
      });
      let message = {};

    const imageStyle = { width: '75wh', position: 'absolute'};
    useEffect(() => {
        const onResize = () => setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [dimensions]);

    const handleEvent = (event) => {
        let motorID = event.currentTarget.id;
        if (event.type === "mousedown") {
            if (motorID === '1-up' || motorID === '1-down') {
                setShoulder(true);
            } else if (motorID === '2-up' || motorID === '2-down') {
                setForearm(true);
            } else if (motorID === '3-up' || motorID === '3-down') {
                setWrist(true);
            } else if (motorID === '4-up' || motorID === '4-down') {
                setGearbox(true);
            } else if (motorID === '5-up' || motorID === '5-down') {
                setEE(true);
            } else if (motorID === '6-up' || motorID === '6-down') {
                setGrip(true);
            } else if (motorID === '7-up' || motorID === '7-down') {
                setGearbox(true);
                setWrist(true)
            }

        } else if (event.type === "mouseup"){
            setShoulder(false);
            setWrist(false);
            setGearbox(false);
            setGrip(false);
            setEE(false);
            setForearm(false);
        }
    }

    /////////////////////////
    // Arm movement control
    /////////////////////////
    function up(topic_name) {
        cmd_arm.name = topic_name;
        message = new window.ROSLIB.Message({data: 40});
        console.log(cmd_arm.name);
        console.log(message);
        cmd_arm.publish(message);
    }
    function down(topic_name){
        cmd_arm.name = topic_name;
        message = new window.ROSLIB.Message({data: -40});
        console.log(cmd_arm.name);
        console.log(message);
        cmd_arm.publish(message);
    }
    function stop(topic_name) {
        cmd_arm.name = topic_name;
        message = new window.ROSLIB.Message({data: 0});
        console.log(cmd_arm.name);
        console.log(message);
        cmd_arm.publish(message);
      };

    const ArmControlButtons = ({ top, left, number, topicName }) => {
        const buttonStyle = { width: 80, height: 40, top: top, left: left, position: 'absolute' };

        return (
            <ButtonGroup vertical style={buttonStyle}>
                <Button variant='outline-dark' id={`${number}-up`} onMouseDown={(e) => {handleEvent(e); up(topicName);}} onMouseUp={(e) => {handleEvent(e); stop(topicName);}}>
                    <h3><i className="fa-solid fa-angle-up" /></h3>
                </Button>
                <Button variant='outline-dark' id={`${number}-down`} onMouseDown={(e) => {handleEvent(e); down(topicName);}} onMouseUp={(e) => {handleEvent(e); stop(topicName);}}>
                    <h3><i className="fa-solid fa-angle-down" /></h3>
                </Button>
            </ButtonGroup>
        )
    }
    const ArmControlButtons2 = ({ top, left, number, topicName1, topicName2 }) => {
        const buttonStyle = { width: 80, height: 40, top: top, left: left, position: 'absolute' };

        return (
            <ButtonGroup vertical style={buttonStyle}>
                <Button variant='outline-dark' id={`${number}-up`} onMouseDown={(e) => {handleEvent(e); up(topicName1); up(topicName2);}} onMouseUp={(e) => {handleEvent(e); stop(topicName1); stop(topicName2);}}>
                    <h3><i className="fa-solid fa-angle-up" /></h3>
                </Button>
                <Button variant='outline-dark' id={`${number}-down`} onMouseDown={(e) => {handleEvent(e); down(topicName1); down(topicName2);}} onMouseUp={(e) => {handleEvent(e); stop(topicName1); stop(topicName2);}}>
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
            <ArmControlButtons top={window.innerHeight*0.50} left={0} number={1} topicName={init_ros_connection.arm_cmd_topics.joint1}/>
            <ArmControlButtons top={window.innerHeight*0.25} left={window.innerWidth*0.25} number={2} topicName={init_ros_connection.arm_cmd_topics.joint2}/>
            <ArmControlButtons top={window.innerHeight*0.11} left={window.innerWidth*0.45} number={3} topicName={init_ros_connection.arm_cmd_topics.joint3}/>
            <ArmControlButtons top={window.innerHeight*0.525} left={window.innerWidth*0.65} number={4} topicName={init_ros_connection.arm_cmd_topics.joint4}/>
            <ArmControlButtons top={window.innerHeight*0.1} left={window.innerWidth*0.9} number={5} topicName={init_ros_connection.arm_cmd_topics.joint5}/>
            <ArmControlButtons top={window.innerHeight*0.725} left={window.innerWidth*0.82} number={6} topicName={init_ros_connection.arm_cmd_topics.joint6}/>
            <ArmControlButtons2 top={window.innerHeight*0.1} left={window.innerWidth*0.7} number={7} topicName1={init_ros_connection.arm_cmd_topics.joint3} topicName2={init_ros_connection.arm_cmd_topics.joint4}/>

        </Row>
    )
}

export default ArmControls;