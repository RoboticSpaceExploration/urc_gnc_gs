import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Connection from "../Components/Connection";
import QueueFeed from "../Components/QueueFeed";

function AutoNav() {
  const [waypointData, setWaypointData] = useState(null);
  const [queueData, setQueueData] = useState(null);
  const [newCoord, setCoord] = useState({
    longitude: null,
    latitude: null,
  });

  const cardStyle = { height: "70vh" };
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

  const handleChange = (e) => {
    const value = e.target.value;
    setCoord({
      ...newCoord,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const coordData = {
      longitude: newCoord.longitude,
      latitude: newCoord.latitude,
    };
    if (!coordData.longitude || !coordData.latitude) {
      console.log("xd");
    } else {
      axios
        .post("http://localhost:9000/autonav", coordData)
        .then((response) => {
          console.log(response.status);
          console.log(response.data.token);
          window.location.reload();
        });
    }
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Row style={{ textAlign: "center", display: "flex", flexWrap: "wrap" }}>
        <Col style={{ alignSelf: "center" }} xs={10}>
          <h1>AutoNav</h1>
        </Col>

        <Col style={{ alignSelf: "center" }} xs={2}>
          <Connection />
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
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="longitude"
                  placeholder="enter longitude"
                  onChange={handleChange}
                />
                <Form.Control
                  type="number"
                  step="0.01"
                  name="latitude"
                  placeholder="enter latitude"
                  onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
              </Form>
            </Col>

            <Col style={{ height: "60vh" }}>
              <h3 style={{ textAlign: "center" }}>Map</h3>
              {waypointData &&
                waypointData.map((waypoint, index) => {
                  console.log(waypoint);
                  return (
                    <div key={index}>
                      <h3 style={{ textAlign: "center" }}>id: {waypoint.id}</h3>
                      <h3 style={{ textAlign: "center" }}>
                        type: {waypoint.type}
                      </h3>
                      <h3 style={{ textAlign: "center" }}>
                        latitude: {waypoint.latitude}
                      </h3>
                      <h3 style={{ textAlign: "center" }}>
                        longitude: {waypoint.longitude}
                      </h3>
                      <h3 style={{ textAlign: "center" }}>
                        visited: {waypoint.visited}
                      </h3>
                      <h3 style={{ textAlign: "center" }}>
                        visible: {waypoint.visible}
                      </h3>
                    </div>
                  );
                })}
            </Col>
          </Row>
        </div>
      </Card>
    </Container>
  );
}

export default AutoNav;
