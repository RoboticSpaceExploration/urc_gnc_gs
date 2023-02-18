import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Camera from "../Components/Camera";
import { init_ros_connection } from '../ROSConnection';
import SideNav from "../Components/SideNav";

class Arm extends React.Component {

  render() {
    const cardStyle = { width: '50vm', height: '50vh' };
    const containerStyle = { height: '100%' };
    const rowStyle = { justifyContent: 'center', textAlign: 'center', verticalAlign: '50%', display: 'flex', alignItems: 'center' };

    return (

        <Container style={containerStyle}>
            <SideNav/>
          <Row style={rowStyle}>
            <h1>ARM</h1>
              <Col>
                <Camera style={cardStyle} host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam3}/>
              </Col>

              <Col>
                <Camera style={cardStyle} host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam5}/>
              </Col>
          </Row>
        </Container>
    );
  };
}

export default Arm;

