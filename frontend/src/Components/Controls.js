import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Alert, Row, Container, Col, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
// import { init_ros_connection } from '../ROSConnection';
import { Teleoperation } from "../scripts/TeleopFunctions";
import 'joypad.js';
import ControllerDisplay from "./ControllerDisplay";

function Controls() {
  const [keyA, setKeyA] = useState(false);
  const [keyS, setKeyS] = useState(false);
  const [keyD, setKeyD] = useState(false);
  const [keyW, setKeyW] = useState(false);
  const [keyU, setKeyU] = useState(false);
  const [keyJ, setKeyJ] = useState(false);
  const [keyI, setKeyI] = useState(false);
  const [keyK, setKeyK] = useState(false);

  const [dPadLeft, setDPadLeft] = useState(false);
  const [dPadDown, setDPadDown] = useState(false);
  const [dPadRight, setDPadRight] = useState(false);
  const [dPadUp, setDPadUp] = useState(false);
  const [buttonA, setButtonA] = useState(false);
  const [buttonB, setButtonB] = useState(false);
  const [buttonX, setButtonX] = useState(false);
  const [buttonY, setButtonY] = useState(false);

  const [usingGamepad, setUsingGamepad] = useState(false);
  const [linSpeed, setLinSpeed ] = useState(0);
  const [angSpeed, setAngSpeed ] = useState(0);

  useEffect(() => {
    // console.log('check');
    if (usingGamepad) {
      // console.log('controller')
      window.joypad.on('connect', (e) => {
        const {id} = e.gamepad;

        console.log(`${id} connected!`);
      });
      window.addEventListener("button_press", e => onButtonPress(e), {capture: true, passive: false});
      window.addEventListener("button_release", e => onButtonRelease(e), {capture: true, passive: false});
      } else {
      // console.log('keyboard');
      window.addEventListener("keydown", onKeyDown, {capture: true, passive: false});
      window.addEventListener("keyup", onKeyUp, {capture: true, passive: false});
      }


    axios({
      method: "GET",
      url: "http://localhost:9000/linSpeed",
    })
        .then((response) => {
          const res = response.data;
          setLinSpeed(res);
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
      url: "http://localhost:9000/angSpeed",
    })
        .then((response) => {
          const res = response.data;
          setAngSpeed(res);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
  }, [usingGamepad, linSpeed, angSpeed]);

  ///////////////////////////
  // Keyboard listener
  ///////////////////////////
  const onKeyDown = useCallback((event) => {
    switch (event.keyCode) {
      case 68: //d turn right
        Teleoperation.turnRight();
        setKeyD(true)
        break;
      case 83: //s move backward
        setKeyS(true)
        Teleoperation.backward();
        break;
      case 65: //a turn left
        setKeyA(true)
        Teleoperation.turnLeft();
        break;
      case 87: //w move forward
        setKeyW(true)
        Teleoperation.forward();
        break;
      case 85: //u fast lin speed
        setKeyU(true)
        Teleoperation.incLinSpeed();
        break;
      case 74: //j slow lin speed
        setKeyJ(true)
        Teleoperation.decLinSpeed();
        break;
      case 73: //i fast ang speed
        setKeyI(true)
        Teleoperation.incAngSpeed();
        break;
      case 75: //k slow ang speed
        setKeyK(true)
        Teleoperation.decAngSpeed();
        break;
      default:
        setKeyW(false)
        setKeyA(false)
        setKeyS(false)
        setKeyD(false)
        setKeyI(false)
        setKeyU(false)
        setKeyK(false)
        setKeyJ(false)
        break;
    }
    event.stopImmediatePropagation();
  }, [])

  const onKeyUp = useCallback((event) => {
    switch (event.keyCode) {
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
      case 73:
        setKeyI(false);
        break;
      case 74:
        setKeyJ(false);
        break;
      case 75:
        setKeyK(false);
        break;
      case 85:
        setKeyU(false);
        break;
      default:
        setKeyW(false)
        setKeyA(false)
        setKeyS(false)
        setKeyD(false)
        setKeyI(false)
        setKeyU(false)
        setKeyK(false)
        setKeyJ(false)
        break;
    }

    Teleoperation.stop();
    event.stopImmediatePropagation();
  }, [])

  ///////////////////////////
  // Controller Listener
  ///////////////////////////
  const onButtonPress = useCallback((e) => {
    switch (e.detail) {
      case 'button_12': //dPadUp move forward
        Teleoperation.forward();
        setDPadUp(true);
        break;
      case 'button_13': //dPadDown move backward
        Teleoperation.backward();
        setDPadDown(true);
        break;
      case 'button_14': //dPadLeft turn left
        Teleoperation.turnLeft();
        setDPadLeft(true);
        break;
      case 'button_15': //dPadRight turn right
        Teleoperation.turnRight();
        setDPadRight(true);
        break;
      case 'button_0': //aButton inc lin speed
        Teleoperation.incLinSpeed();
        setButtonA(true);
        break;
      case 'button_1': //bButton dec lin speed
        Teleoperation.decLinSpeed();
        setButtonB(true);
        break;
      case 'button_2': //xButton inc ang speed
        Teleoperation.incAngSpeed();
        setButtonX(true);
        break;
      case 'button_3': //yButton dec ang speed
        Teleoperation.decAngSpeed();
        setButtonY(true);
        break;
      default:
        setDPadUp(false)
        setDPadDown(false)
        setDPadLeft(false)
        setDPadRight(false)
        setButtonA(false)
        setButtonB(false)
        setButtonX(false)
        setButtonY(false)
        break;
    }

    e.stopImmediatePropagation();
  }, [])

  const onButtonRelease = useCallback((e) => {
    switch (e.detail) {
      case 'button_12': //dPadUp
        setDPadUp(false);
        break;
      case 'button_13': //dPadDown
        setDPadDown(false);
        break;
      case 'button_14': //dPadLeft
        setDPadLeft(false);
        break;
      case 'button_15': //dPadRight
        setDPadRight(false);
        break;
      case 'button_0': //aButton
        setButtonA(false);
        break;
      case 'button_1': //bButton
        setButtonB(false);
        break;
      case 'button_2': //xButton
        setButtonX(false);
        break;
      case 'button_3': //yButton
        setButtonY(false);
        break;
      default:
        setDPadUp(false)
        setDPadDown(false)
        setDPadLeft(false)
        setDPadRight(false)
        setButtonA(false)
        setButtonB(false)
        setButtonX(false)
        setButtonY(false)
        break;
    }

    Teleoperation.stop();
    e.stopImmediatePropagation();
  }, [])

  function handleChange(e) {
    const value = e.target.value === "true";
    // console.log(value);
    setUsingGamepad(value);
    if (value) {
      window.removeEventListener("keyup", onKeyUp, {capture: true, passive: false});
      window.removeEventListener("keydown", onKeyDown, {capture: true, passive: false});


      window.addEventListener("button_press", e => onButtonPress(e), {capture: true, passive: false});
      window.addEventListener("button_release", e => onButtonRelease(e), {capture: true, passive: false});

    } else {
      window.removeEventListener("button_press", e => onButtonPress(e), {capture: true, passive: false});
      window.removeEventListener("button_release", e => onButtonRelease(e), {capture: true, passive: false});

      window.addEventListener("keydown", onKeyDown, {capture: true, passive: false});
      window.addEventListener("keyup", onKeyUp, {capture: true, passive: false});

    }
  }

  return (
      <div>
        <ToggleButtonGroup type="radio" name="options" defaultValue="false">
          <ToggleButton id="keyboard-button" variant="secondary" value="false" checked={!usingGamepad} onChange={handleChange}>
            Keyboard
          </ToggleButton>
          <ToggleButton id="controller-button" variant="secondary" value="true" checked={usingGamepad} onChange={handleChange}>
            Controller
          </ToggleButton>
        </ToggleButtonGroup>
        {usingGamepad ?
            <div>
          <Container style={{textAlign: 'center', marginTop: '10vh'}}>
            <Row>
              <Col style={{textAlign: 'center'}}>
                <Row>
                  <h1>Legend</h1>
                  <Col>
                    <Row style={{textAlign: 'center',}}>
                      <Col style={{textAlign: 'right'}}>
                        <p4>DPadUp = Forward</p4>
                      </Col>
                      <Col style={{textAlign: 'left'}}>
                        <p4>A = Increase Linear Speed</p4>
                      </Col>
                    </Row>
                    <Row style={{textAlign: 'center'}}>
                      <Col style={{textAlign: 'right'}}>
                        <p4>DpadDown = Backward</p4>
                      </Col>
                      <Col style={{textAlign: 'left'}}>
                        <p4>B = Decrease Linear Speed</p4>
                      </Col>
                    </Row>
                    <Row style={{textAlign: 'center'}}>
                      <Col style={{textAlign: 'right'}}>
                        <p4>DPadLeft = Turn Left</p4>
                      </Col>
                      <Col style={{textAlign: 'left'}}>
                        <p4>X = Increase Angular Speed</p4>
                      </Col>
                    </Row>
                    <Row style={{textAlign: 'center'}}>
                      <Col style={{textAlign: 'right'}}>
                        <p4>DPadRight = Turn Right</p4>
                      </Col>
                      <Col style={{textAlign: 'left'}}>
                        <p4>Y = Decrease Angular Speed</p4>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <ControllerDisplay
                    directionUp={dPadUp}
                    directionDown={dPadDown}
                    directionLeft={dPadLeft}
                    directionRight={dPadRight}
                    buttonDown={buttonA}
                    buttonRight={buttonB}
                    buttonLeft={buttonX}
                    buttonUp={buttonY}
                    style={{marginTop: '10vh'}}
                />
              </Col>
            </Row>
          </Container>
        </div>
            :
            <div>
              <Container style={{ textAlign: 'center', marginTop: '5vh' }}>
                <Row>
                  <Col style={{textAlign:'center'}}>
                    <h3>Teleoperation Control</h3>
                    <Row style={{ justifyContent: 'center', alignContent: 'center' }}>
                      <Alert variant={keyW ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 0, marginRight: 0 }}>W</Alert>
                    </Row>
                    <Row style={{ justifyContent: 'center' }}>
                      <Alert variant={keyA ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 0, marginRight: '10px' }}>A</Alert>
                      <Alert variant={keyS ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 0, marginRight: 0 }}>S</Alert>
                      <Alert variant={keyD ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: '10px', marginRight: 0 }}>D</Alert>
                    </Row>
                  </Col>
                  <Col>
                    <Row>
                      <Col>
                        <h3>Linear Speed</h3>
                        <Row>
                          <Alert variant={keyU ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto'}}>U</Alert>
                        </Row>
                        <Row>
                          <Alert variant={keyJ ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto' }}>J</Alert>
                        </Row>
                      </Col>
                      <Col>
                        <h3>Angular Speed</h3>
                        <Row>
                          <Alert variant={keyI ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto' }}>I</Alert>
                        </Row>
                        <Row>
                          <Alert variant={keyK ? 'dark' : 'secondary'} style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto' }}>K</Alert>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </div>
        }
      </div>
  );

}

export default Controls;
