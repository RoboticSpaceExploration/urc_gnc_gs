import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import Camera from "../Components/Camera";
import Config from '../scripts/config';
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
              <Camera topic={Config.CMD_CAM_TOPIC}/>
              <Camera style={cardStyle} topic={Config.CMD_CAM_TOPIC}/>
          </Row>
          <Row style={rowStyle}>
            <Col>
              WASD
            </Col>

            <Col>
              WASD
            </Col>
          </Row>
        </Container>
    );
  };
}

export default Arm;

