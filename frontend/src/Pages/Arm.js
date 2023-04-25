import React from 'react';
import { Row, Button, Container, Col, Card } from 'react-bootstrap';
import Camera from "../Components/Camera";
import SideNav from "../Components/SideNav";
import { init_ros_connection } from '../ROSConnection';

class Arm extends React.Component {
  render() {
    const controls = 'left=100, top=100, width=1520, height=860';
    const cardStyle = { height: "30vh", justifyContent: 'center', alignItems: 'center', alignContent: 'center' };
    const rowStyle = { justifyContent: 'center', textAlign: 'center', verticalAlign: '50%', display: 'flex', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row' };
    const buttonStyle = { backgroundColor: "purple", borderStyle: "none", marginRight: "0.25em" };
    return (
      <div id="arm-page">
        <SideNav/>
        <Container style={{marginTop: "-80px"}}>
          <h1 className = 'text-center mt-3'> System </h1>

          <Button style={buttonStyle} onClick={()=> window.open('/#/arm/controls','armcontrols', controls)}>
                Open Arm Controls
          </Button>
            {/* <ReactPlayer url = 'http://192.168.0.112:8554/ts.m3u8'/> */}

          {/* Camera Feeds */}
          <Row style={rowStyle}>
            <Col>
           <Camera host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam3}/>
            </Col>
            <Col>
             <Camera host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam5}/>
            </Col>
          </Row>
        </Container>
        </div>
    );
  };
}

export default Arm;

