import React from 'react';
import { Row, Button, Container, Col, Card } from 'react-bootstrap';
import ArmControls from './Arm/ArmControls';
class Arm extends React.Component {
  render() {
    const controls = 'left=100, top=100, width=1520, height=860';
    const cardStyle = { height: "30vh", justifyContent: 'center', alignItems: 'center', alignContent: 'center' };
    const rowStyle = { justifyContent: 'center', textAlign: 'center', verticalAlign: '50%', display: 'flex', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row' };
    const buttonStyle = { backgroundColor: "purple", borderStyle: "none", marginRight: "0.25em" };
    return (
        <div id="arm-page">
          <Container>
            <ArmControls/>
          </Container>
        </div>
    );
  };
}

export default Arm;

