import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Button, Navbar, Offcanvas, Image, Nav, NavbarBrand } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import RoseLogo from "../Images/rose-logo.png";
import ListGroup from 'react-bootstrap/ListGroup';

const SideNav = (props) => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('light');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const camera1 = 'left=0, top=0, width=750, height=400';
  const camera2 = 'left=1000, top=0, width=750, height=400';
  const otherFeats = 'left=0, top=500, width=750, height=400';
  const controlFeats = 'left=1000, top=500, width=750, height=400';
  const imageStyle = { width: "85px", height: "80px", marginLeft: '10px', marginRight: '10px' }
  const navbarStyle = { textDecoration: 'none', color: '#ab2c94', marginBottom: '10px' }
  const logoStyle = { padding: 0, hover: 'none', boxShadow: 'none', boxShadowColor: 'none', margin: 'none' }

  const popover = (
      <Popover id="popover-basic">
        <Popover.Body>
          <ListGroup variant="flush">
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/chassiscam','cameraChassis', camera1)}>Camera Feed on Chassis</ListGroup.Item>
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/armcam','cameraArm', camera2)}>Camera Feed on Arm</ListGroup.Item>
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/gps','gps', otherFeats)}>Current GPS Coordinates</ListGroup.Item>
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/orientation','orientation', otherFeats)}>Orientation</ListGroup.Item>
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/speedometer','speedometer', otherFeats)}>Speedometer</ListGroup.Item>
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/controls','controls', controlFeats)}>Controls</ListGroup.Item>
          </ListGroup>
        </Popover.Body>
      </Popover>
  );

  document.getElementById('checkbox')?.addEventListener('change', () => {
    document.div.classList.toggle('dark');
    document.main.classList.toggle('dark');
    setMode('dark')
  })

  return (
      <>
        <Navbar bg={mode} variant={mode}>
            <Button variant={mode} onClick={handleShow} style={logoStyle}>
              <Image src={RoseLogo} style={imageStyle}/>
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <div style={{ justifyContent: 'flex-end' }}>
                    <input type="checkbox" className="checkbox" id="checkbox" />
                    <label htmlFor="checkbox" className="label">
                      <i className="fas fa-moon" style={{ color: 'whitesmoke' }} />
                      <i className='fas fa-sun' style={{ color: 'yellow' }}/>
                      <div className='ball' />
                    </label>
                  </div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav variant="pills" className="flex-column" >
                  <Nav.Item
                      key="first"
                      id="navbar-rose-logo"
                      as={NavLink}
                      className="active"
                      exact="true"
                      to="/"
                      style={navbarStyle}
                  >
                    <h3><i className="fa-solid fa-house" /> Home</h3>
                  </Nav.Item>
                  <Nav.Item
                      key="second"
                      id="navbar-rover-data"
                      as={NavLink}
                      className="active"
                      exact="true"
                      style={navbarStyle}
                  >
                    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                      <h3><i className="fa-solid fa-database" /> Rover Data</h3>
                    </OverlayTrigger>
                  </Nav.Item>
                  <Nav.Item
                      key="third"
                      id="navbar-autonav"
                      as={NavLink}
                      className="active"
                      exact="true"
                      to="/autonav"
                      style={navbarStyle}
                  >
                    <h3><i className="fa-solid fa-route" /> AutoNav</h3>
                  </Nav.Item>
                  <Nav.Item
                      key="fourth"
                      id="navbar-payload"
                      as={NavLink}
                      className="active"
                      exact="true"
                      to="/payload"
                      style={navbarStyle}
                  >
                    <h3><i className="fa-solid fa-cart-flatbed-suitcase" /> Payload</h3>
                  </Nav.Item>
                  <Nav.Item
                      key="fifth"
                      id="navbar-arm"
                      as={NavLink}
                      className="active"
                      exact="true"
                      to="/arm"
                      style={navbarStyle}
                  >
                    <h3><i className="fa-solid fa-robot" /> ARM</h3>
                  </Nav.Item>
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
        </Navbar>
      </>
  );
};

export default SideNav;
