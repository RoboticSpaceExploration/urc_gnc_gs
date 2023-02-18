import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Camera from "../Components/Camera";
import ReactNipple from 'react-nipple';
import { init_ros_connection } from '../ROSConnection';
import SideNav from "../Components/SideNav";

class Arm extends React.Component {

  render() {
    const cardStyle = { width: '50vm', height: '50vh' };
    const containerStyle = { height: '100%' };
    const rowStyle = { justifyContent: 'center', textAlign: 'center', verticalAlign: '50%', display: 'flex' };

    return (

        <Container style={containerStyle}>
            <SideNav/>
          <Row style={rowStyle}>
            <h1>ARM</h1>
              <Col>
                <h3 style={{ textAlign: 'center' }}>Camera Feeds</h3>
                <Camera style={cardStyle} host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam3}/>
                <Camera style={cardStyle} host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam5}/>
              </Col>

              <Col>
                <h3 style={{ textAlign: 'center' }}>ARM Controls</h3>
                <ReactNipple
                    options={{
                      mode: 'static',
                      position: { top: '40%', left: '70%' },
                      color: "black"
                    }}
                    style={{
                      width: 150,
                      height: 150,
                    }}
                    onMove={(evt, data) => console.log(evt, data)}
                />
              </Col>
          </Row>
        </Container>
    );
  };
}

export default Arm;

