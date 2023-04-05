import React from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import SideNav from '../Components/SideNav';
import DataCard from '../Components/DataCard';

function System(props){
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
      <Container>
        <SideNav />
          {/* Comms */}
        <Row>
          <DataCard title={Object.entries(sampleData)[0][0] + ": " +  Object.entries(Object.entries(sampleData)[0][1])[0][0]} data={sampleData}/>
          <DataCard title={Object.entries(sampleData)[0][0] + ": " +  Object.entries(Object.entries(sampleData)[0][1])[1][0]} data={sampleData}/>
          <DataCard title={Object.entries(sampleData)[0][0] + ": " +  Object.entries(Object.entries(sampleData)[0][1])[2][0]} data={sampleData}/>
          <DataCard title={Object.entries(sampleData)[0][0] + ": " +  Object.entries(Object.entries(sampleData)[0][1])[3][0]} data={sampleData}/>
        </Row>

    </Container>
    );

}
export default System;
