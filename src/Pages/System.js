import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import SideNav from '../Components/SideNav';
import DataCard from '../Components/DataCard';

function System(props){
  const rowStyle = { justifyContent: 'center', textAlign: 'center', verticalAlign: '50%', display: 'flex', alignItems: 'center', padding: '0.5em' };

  const sampleData = {
    comms: {
      base_station: {
        router: "up"
      },
      mechanical: {

      },
      onboard: {

      },
      sensor:{

      }
    },
    load_data: {},
    docker_status: {},
    ros_status: {},

  };
  console.log(Object.entries(sampleData)[0][1]);

    return (
      <div id="system-page">
        <SideNav/>
        <Container style={{marginTop: "-80px"}}>
          <h1 className = 'text-center mt-3'> System </h1>
          {/* Comms */}
        <Row style={rowStyle}>
          <DataCard title={Object.entries(sampleData)[0][0] + ": " +  Object.entries(Object.entries(sampleData)[0][1])[0][0]} data={sampleData}/>
          <DataCard title={Object.entries(sampleData)[0][0] + ": " +  Object.entries(Object.entries(sampleData)[0][1])[1][0]} data={sampleData}/>
          <DataCard title={Object.entries(sampleData)[0][0] + ": " +  Object.entries(Object.entries(sampleData)[0][1])[2][0]} data={sampleData}/>
          <DataCard title={Object.entries(sampleData)[0][0] + ": " +  Object.entries(Object.entries(sampleData)[0][1])[3][0]} data={sampleData}/>
        </Row>
        <Row style={rowStyle}>
          {/* Load data */}
          <Col>
            <DataCard title={Object.entries(sampleData)[1][0]} data={sampleData}/>
            <DataCard title={Object.entries(sampleData)[1][0]} data={sampleData}/>
            <DataCard title={Object.entries(sampleData)[1][0]} data={sampleData}/>
          </Col>
          <Col>
            <DataCard title={Object.entries(sampleData)[1][0]} data={sampleData}/>
            <DataCard title={Object.entries(sampleData)[1][0]} data={sampleData}/>
            <DataCard title={Object.entries(sampleData)[1][0]} data={sampleData}/>
          </Col>
          {/* Docker Status */}
          <Col>
            <DataCard title={Object.entries(sampleData)[2][0]} data={sampleData}/>
          </Col>
        </Row>
        <Row style={rowStyle}>
          {/* System Control */}
          <Col >
            System Control
          </Col>
          {/* ROS Status */}
          <Col>
            <DataCard title={Object.entries(sampleData)[3][0]} data={sampleData}/>
          </Col>
        </Row>
    </Container>
      </div>
    );

}
export default System;
