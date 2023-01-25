import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import RoseLogo from '../Images/rose-logo.png';
import AutoNavLogo from '../Images/autonav.png';
import RoverDataLogo from '../Images/rover-data.png';
import PayloadLogo from '../Images/payload.png';
import ArmLogo from '../Images/arm.png';
import Connection from '../Components/Connection';

function AutoNav() {
  const [ waypointData, setWaypointData] = useState(null);
  const [ newCoord, setCoord ] = useState({
      longitude: null,
      latitude: null
  });

  const cardStyle = { height: '70vh' };
  const titleStyle = { textAlign: 'center', marginBottom: '10px' };

  useEffect(() => {
    axios({
	    method: "GET",
	    url:"http://localhost:9000/waypoints",
    }).then((response) => {
	    const res = response.data;
	    setWaypointData(res);
    }).catch((error) => {
	    if (error.response) {
		    console.log(error.response);
		    console.log(error.response.status);
		    console.log(error.response.headers);
	    }
    })},[])

    const handleChange = (e) => {
        const value = e.target.value;
        setCoord({
            ...newCoord,
            [e.target.name]: value
        });
        console.log(newCoord);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const coordData = {
            longitude: newCoord.longitude,
            latitude: newCoord.latitude
        };
        console.log(coordData);
        axios.post("http://localhost:9000/autonav", coordData).then((response) => {
            console.log(response.status);
            console.log(response.data.token);
            window.location.reload();
        });
    };

    return (
        <Container style={{ marginTop: '10px' }}>
          <Row style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap' }}>
            <Col style={{ alignSelf: 'center' }} xs={10}>
              <h1>AutoNav</h1>
            </Col>

            <Col style={{ alignSelf: 'center' }} xs={2}>
              <Connection />
            </Col>
          </Row>

          <Card style={cardStyle}>
            <div>
              <Row style={{ display: 'flex' }}>
                <Col style={cardStyle} className="divider" xs={4}>
                  <h3 style={{ textAlign: 'center' }}>Queue List</h3>
                  <div>
                    <Toast>
                      <Toast.Header closeButton={false}>
                        <img
                            src={RoseLogo}
                            className="queue-img"
                            alt=""
                        />
                        <strong className="me-auto">1</strong>
                        <small className="text-muted">just now</small>
                      </Toast.Header>
                      <Toast.Body>Rover did thing 1</Toast.Body>
                    </Toast>
                    <Toast>
                      <Toast.Header closeButton={false}>
                        <img
                            src={AutoNavLogo}
                            className="queue-img"
                            alt=""
                        />
                        <strong className="me-auto">2</strong>
                        <small className="text-muted">just now</small>
                      </Toast.Header>
                      <Toast.Body>Rover did thing 2</Toast.Body>
                    </Toast>
                  </div>

                </Col>

                <Col style={{ height: '60vh' }} >
                  <h3 style={{ textAlign: 'center' }}>Map</h3>
                  {waypointData &&
                      waypointData.map((waypoint, index) => {
                        console.log(waypoint);
                        return (
                            <div>
                              <h1 style={{ textAlign: "center" }}>id: {waypoint.id}</h1>
                              <h1 style={{ textAlign: "center" }}>type: {waypoint.type}</h1>
                              <h1 style={{ textAlign: "center" }}>latitude: {waypoint.latitude}</h1>
                              <h1 style={{ textAlign: "center" }}>longitude: {waypoint.longitude}</h1>
                              <h1 style={{ textAlign: "center" }}>visited: {waypoint.visited}</h1>
                              <h1 style={{ textAlign: "center" }}>visible: {waypoint.visible}</h1>
                            </div>
                        );
                      })
                  }
                  <Form onSubmit={handleSubmit}>
                    <Form.Control type="number" step="0.01" name="longitude" placeholder="enter longitude" onChange={handleChange}/>
                    <Form.Control type="number" step="0.01" name="latitude" placeholder="enter latitude" onChange={handleChange}/>
                    <Button type="submit" >Submit</Button>
                  </Form>
                </Col>
              </Row>
            </div>
            </Card>
        </Container>

    );
}

export default AutoNav;
