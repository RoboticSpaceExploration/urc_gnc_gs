import React, { useEffect, useState } from "react";
import { Button, Col, Row, Container, Card } from "react-bootstrap";
import Camera from "../Components/Camera";
import SideNav from '../Components/SideNav';
import RoverDataGPS from './RoverData/RoverDataGPS';
import axios from 'axios';
import HomeMap from '../Components/HomeMap';
function NewHome() {
  const [waypointData, setWaypointData] = useState(null);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:9000/waypoints",
    })
        .then((response) => {
          const res = response.data;
          setWaypointData(res);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
  }, []);

  const cardStyle = { height: "50vh", justifyContent: 'center', alignItems: 'center', alignContent: 'center' };
  const rowStyle = { justifyContent: 'center', textAlign: 'center', verticalAlign: '50%', display: 'flex', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row' };
  const colStyle = {paddingLeft: '0', paddingRight: '0'};
  return (
      <div id="newHome-page">
        <SideNav/>
        <Container style={{marginTop: "-80px"}}>
          <h1 className = 'text-center mt-3'> Home Rover Data</h1>
          {/* Camera Feeds */}
          <Row style={rowStyle}>
            <Col style={colStyle}>
              <Card style={cardStyle}>Camera Feed 1</Card>
              {/*<Camera style={cardStyle} topic={Config.CMD_CAM_TOPIC}/>*/}
            </Col>
            <Col style={colStyle}>
              <Card style={cardStyle}>Camera Feed 2</Card>
              {/*<Camera style={cardStyle} host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam2}/>*/}
            </Col>
          </Row>
          <Row style={cardStyle}>
            <Col xs={6} style={colStyle}>
              <Card style={cardStyle}>Camera Feed 3</Card>
              {/*<Camera style={cardStyle} host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam1}/>*/}
            </Col>
            <Col xs={6} style={colStyle}>
              <HomeMap waypointData={waypointData}/>
              <RoverDataGPS />
            </Col>
          </Row>
        </Container>
      </div>
  );
}

export default NewHome;

