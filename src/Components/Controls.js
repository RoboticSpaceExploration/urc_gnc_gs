import React, { useState } from 'react';
import { Alert, Row, Container } from 'react-bootstrap';
import RoverDataDropdown from './RoverDataDropdown';

const Controls = () => {
  const [keyA, setKeyA] = useState(false);
  const [keyS, setKeyS] = useState(false);
  const [keyD, setKeyD] = useState(false);
  const [keyW, setKeyW] = useState(false);

  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);

  function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68: //d
        setKeyD(true)
        break;
      case 83: //s
        setKeyS(true)
        break;
      case 65: //a
        setKeyA(true)
        break;
      case 87: //w
        setKeyW(true)
        break;
      default:
        setKeyW(false)
        setKeyA(false)
        setKeyS(false)
        setKeyD(false)
        break;
    }
  }

  function onKeyUp(event) {
    var keyCode = event.keyCode;

    switch (keyCode) {
      case 68: //d
        setKeyD(false)
        break;
      case 83: //s
        setKeyS(false)
        break;
      case 65: //a
        setKeyA(false)
        break;
      case 87: //w
        setKeyW(false)
        break;
      default:
        setKeyW(false)
        setKeyA(false)
        setKeyS(false)
        setKeyD(false)
        break;
    }
  }

  return (
      <div>
        <RoverDataDropdown dataType="Controls"/>
        <Container style={{ textAlign: 'center', marginTop: '20vh' }}>
        <Row style={{ justifyContent: 'center', alignContent: 'center' }}>
          <Alert variant={keyW ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: 0 }}>W</Alert>
        </Row>

        <Row style={{ justifyContent: 'center' }}>
            <Alert variant={keyA ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: '20px' }}>A</Alert>
            <Alert variant={keyS ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: 0 }}>S</Alert>
            <Alert variant={keyD ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: '20px', marginRight: 0 }}>D</Alert>
        </Row>
        </Container>
      </div>
  );
}

export default Controls;