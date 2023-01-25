import React, { useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const RoverDataDropdown = () => {
  const [camera, cameraCheck] = useState(false);
  const [model, modelCheck] = useState(false);
  const [speed, speedCheck] = useState(false);
  const [spec, specCheck] = useState(false);

  const containerStyle = { marginTop: '10px', textAlign: 'center' };
  const buttonGroupStyle = { justifyContent: 'center', textAlign: 'center', verticalAlign: '50%', display: 'flex', alignItems: 'center' };

  const resetSelection = () => {
    cameraCheck(false);
    modelCheck(false);
    speedCheck(false);
    specCheck(false);
  }

  return (
    <Container style={containerStyle}>
      <h1>Rover Data</h1>
      <ButtonGroup style={buttonGroupStyle}>
        <ToggleButton
            className="mb-2"
            id="camera-check"
            type="checkbox"
            variant="outline-primary"
            checked={camera}
            value="1"
            onChange={(e) => cameraCheck(e.currentTarget.checked)}
        >
          Camera
        </ToggleButton>

        <ToggleButton
            className="mb-2"
            id="model-check"
            type="checkbox"
            variant="outline-primary"
            checked={model}
            value="1"
            onChange={(e) => modelCheck(e.currentTarget.checked)}
        >
          Model
        </ToggleButton>

        <ToggleButton
            className="mb-2"
            id="speed-check"
            type="checkbox"
            variant="outline-primary"
            checked={speed}
            value="1"
            onChange={(e) => speedCheck(e.currentTarget.checked)}
        >
          Speed
        </ToggleButton>

        <ToggleButton
            className="mb-2"
            id="spec-check"
            type="checkbox"
            variant="outline-primary"
            checked={spec}
            value="1"
            onChange={(e) => specCheck(e.currentTarget.checked)}
        >
          Specifications
        </ToggleButton>

        <Button className="mb-2" as="input" type="reset" variant={"danger"} value="Reset" onClick={() => resetSelection()}/>
      </ButtonGroup>
    </Container>
  ); 
};

export default RoverDataDropdown;
