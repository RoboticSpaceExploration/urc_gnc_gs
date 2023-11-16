import React, { useEffect, useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import axios from "axios";
import Connection from "../Components/Connection";
import QueueFeed from "../Components/QueueFeed";
import SideNav from '../Components/SideNav';
import Map from '../Components/Map';
import QueueForm from '../Components/Forms/QueueForm';
import WaypointForm from '../Components/Forms/WaypointForm';

function AutoNav() {
  const [waypointData, setWaypointData] = useState(null);
  const [queueData, setQueueData] = useState(null);

  const cardStyle = { height: "100vh" };
  const titleStyle = { textAlign: "center", marginBottom: "10px" };

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
    axios({
      method: "GET",
      url: "http://localhost:9000/autonav",
    })
      .then((response) => {
        const res = response.data;
        setQueueData(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, []);

  return (
    
    <div id="autonav-page">
     
    <Container >
      <Row style={{ textAlign: "center", display: "flex", flexWrap: "wrap" }}>
        <Col style={{ alignSelf: "center" }} xs={10}>
          <h1>AutoNav</h1>
        </Col>

        <Col style={{ alignSelf: "center" }} xs={2}>
        
        </Col>
      </Row>

      <Card style={cardStyle}>
        <div>
          <Row style={{ display: "flex" }}>
            <Col style={cardStyle} className="divider" xs={4}>
              <h3 style={{ textAlign: "center" }}>Queue List</h3>
              {queueData &&
                queueData.map((queue) => {
                  return (
                    <QueueFeed
                      queue={queue.queue}
                      latitude={queue.latitude}
                      longitude={queue.longitude}
                      key={queue.queue}
                    />
                  );
                })}
              <QueueForm/>
            </Col>

            <Col style={cardStyle} className="divider" xs={4}>
              <h3 style={{ textAlign: "center" }}>Map</h3>
              <Map waypointData={waypointData}/>
            </Col>
            <Col style={{ height: "60vh" }}>
              <h3 style={{ textAlign: "center" }}>Insert Waypoint</h3>
              <WaypointForm/>
            </Col>
          </Row>
        </div>
      </Card>
    </Container>
    </div>
  
  );
}

export default AutoNav;
