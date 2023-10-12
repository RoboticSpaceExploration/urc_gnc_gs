import React from "react";
import { Button, Col, Row, Container, Card } from "react-bootstrap";
import Camera from "../Components/Camera";
import SideNav from '../Components/SideNav';
import RoverDataGPS from './RoverData/RoverDataGPS';
import RoverDataOrientation from './RoverData/RoverDataOrientation';
import RoverDataControl from './RoverData/RoverDataControl';
function NewHome() {
  const cardStyle = { height: "30vh", justifyContent: 'center', alignItems: 'center', alignContent: 'center' };
  const rowStyle = { justifyContent: 'center', textAlign: 'center', verticalAlign: '50%', display: 'flex', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row' };

  return (
      <div id="payload-page">
        <SideNav/>
        <ls style={{marginTop: "-80px"}}>
          <h1 className = 'text-center mt-3'> Home Rover Data</h1>
          {/* Camera Feeds */}
          <Row style={rowStyle}>
            <Col>
              <Card style={cardStyle}>Camera Feed 1</Card>
              {/*<Camera style={cardStyle} topic={Config.CMD_CAM_TOPIC}/>*/}
            </Col>
            <Col>
              <Card style={cardStyle}>Camera Feed 2</Card>
              {/*<Camera style={cardStyle} host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam2}/>*/}
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col xs={6}>
              <Card style={cardStyle}>Camera Feed 3</Card>
              {/*<Camera style={cardStyle} host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam1}/>*/}
            </Col>
            <Col xs={3}>
              <Row style={rowStyle}>
                  Location
              </Row>
              <Row style={rowStyle}>
                <RoverDataGPS />
              </Row>
            </Col>
            <Col xs={3}>
              <Row style={rowStyle}>
                Orientation
              </Row>
              <Row style={rowStyle}>
                <RoverDataOrientation />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col><RoverDataControl /></Col>
          </Row>
        </ls>
      </div>
  );
}

export default NewHome;

