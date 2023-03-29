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
import SideNav from '../Components/SideNav';
import Map from '../Components/Map';

function AutoNav() {
  const [waypointData, setWaypointData] = useState(null);
  const [queueData, setQueueData] = useState(null);
  const [newCoord, setCoord] = useState({
    longitude: null,
    latitude: null,
  });
  const [queueValidated, setValidated] = useState(false);

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

  const handleChange = (e) => {
    const value = e.target.value;
    setCoord({
      ...newCoord,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
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
      <SideNav />
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
              <Form noValidate validated={queueValidated} onSubmit={handleSubmit}>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="longitude"
                  placeholder="enter longitude"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please give valid input.
                </Form.Control.Feedback>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="latitude"
                  placeholder="enter latitude"
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please give valid input.
                </Form.Control.Feedback>
                <Button type="submit">Submit</Button>
              </Form>
            </Col>

            <Col style={{ height: "60vh" }}>
              <h3 style={{ textAlign: "center" }}>Map</h3>
              <Map waypointData={waypointData}/>
            </Col>
          </Row>
        </div>
      </Card>
    </Container>
  );
}

export default AutoNav;
