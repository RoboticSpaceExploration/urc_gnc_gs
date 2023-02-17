import React, { useState, KeyboardEvent } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import Config from '../scripts/config';

const Controls = () => {
  const [keyA, setKeyA] = useState(false);
  const [keyS, setKeyS] = useState(false);
  const [keyD, setKeyD] = useState(false);
  const [keyW, setKeyW] = useState(false);

  window.addEventListener("keydown", onKeyDown, false);
  window.addEventListener("keyup", onKeyUp, false);

  function init_connection() {

  }

  function onKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
      case 68: //d
        setKeyD(true)
        break;
      case 83: //s move backward
        setKeyS(true)
        break;
      case 65: //a turn left
        setKeyA(true)
        break;
      case 87: //w move forward
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
      <div style={{ textAlign: 'center', width: '80%', marginTop: '40vh', marginLeft: 0 }}>
        <Row style={{ justifyContent: 'center' }}>
          <Alert variant={keyW ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: 0 }}>W</Alert>
        </Row>

        <Row style={{ justifyContent: 'center', display: 'inline-flex' }}>
            <Alert variant={keyA ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: '20px' }}>A</Alert>
            <Alert variant={keyS ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: 0, marginRight: 0 }}>S</Alert>
            <Alert variant={keyD ? 'dark' : 'secondary'} style={{ width: '150px', marginLeft: '20px', marginRight: 0 }}>D</Alert>
        </Row>
      </div>
  );
}

export default Controls;