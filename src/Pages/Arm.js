import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import SideNav from '../Components/SideNav';

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
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title>Camera 1</Card.Title>

                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={cardStyle}>
                <Card.Body>
                  <Card.Title>Camera 2</Card.Title>

                </Card.Body>
              </Card>
            </Col>
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

