import React, { useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import { Button, Navbar, Offcanvas, Image, Nav, ButtonGroup, ToggleButton, OverlayTrigger, Popover, ListGroup, NavItem } from "react-bootstrap";
import PropTypes from 'prop-types';
import RoseLogo from "../Images/rose-logo.png";

const SideNav = ({ mode }) => {
  const [show, setShow] = useState(false);
  const [setting, setSetting] = useState(document.body.classList.toggle("dark-mode") ? 'light' : 'dark');
  const [radioVal, setRadio] = useState(document.body.classList.toggle("dark-mode") ? '2' : '1');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const camera1 = 'left=0, top=0, width=750, height=400';
  const camera2 = 'left=1000, top=0, width=750, height=400';
  const otherFeats = 'left=0, top=500, width=750, height=400';
  const controlFeats = 'left=1000, top=500, width=750, height=400';
  const imageStyle = { width: "85px", height: "80px", marginLeft: '10px', marginRight: '10px' }
  const navbarStyle = { textDecoration: 'none', color: '#ab2c94' }
  const logoStyle = { padding: 0, hover: 'none', boxShadow: 'none', boxShadowColor: 'none', margin: 'none' }
  const radios = [
    { name: 'Light', value: '1' },
    { name: 'Dark', value: '2' },
  ];



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

  const toggleDarkMode = (e) => {
    console.log(document.body.classList.toggle("dark-mode"));
    setSetting((radioVal === 1) ? 'dark' : 'light')
    setRadio(e.currentTarget.value)
  };

  return (
      <>
        <Navbar bg={mode} style={{ display: 'flex',position: '-webkit-sticky',position: 'sticky',top:15}}>
          <div >
           
          
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? 'outline-secondary' : 'outline-dark'}
                    value={radio.value}
                    checked={radioVal === radio.value}
                    onChange={(e) => toggleDarkMode(e)}
                >
                  {radio.name}
                </ToggleButton>
                ))}
              </ButtonGroup>
              
              <div style={{paddingTop:10}}>
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
                    <h3><i className="fa-solid fa-database" /> Rover Data</h3>
                  </Nav.Item>
                  <NavItem
                      key="blah"
                      id="navbar-camera"
                      as={NavLink}
                      className="active"
                      exact="true"
                      style={navbarStyle}
                  >
                    <h4 style={{marginLeft:'35px'}}>Camera</h4>
                  </NavItem>
                  <NavItem
                      key="blah"
                      id="navbar-location"
                      as={NavLink}
                      className="active"
                      exact="true"
                      style={navbarStyle}
                  >
                    <h4 style={{marginLeft:'35px'}}>Location</h4>
                  </NavItem>
                  <NavItem
                      key="blah"
                      id="navbar-speedometer"
                      as={NavLink}
                      className="active"
                      exact="true"
                      style={navbarStyle}
                  >
                    <h4 style={{marginLeft:'35px'}}>Speedometer</h4>
                  </NavItem>
                  <NavItem
                      key="blah"
                      id="navbar-teleopcontrols"
                      as={NavLink}
                      className="active"
                      exact="true"
                      style={navbarStyle}
                  >
                    <h4 style={{marginLeft:'35px'}}>Teleop Controls</h4>
                  </NavItem>
                  <Nav.Item
                      key="fifth"
                      id="navbar-arm"
                      as={NavLink}
                      className="active"
                      exact="true"
                      // to="/arm"
                      style={navbarStyle}
                  >
                    <h4 style={{marginLeft:'35px'}}> Arm Controls</h4>
                  </Nav.Item>

                  <div style={navbarStyle}>
                    <h3><i className="fa-solid fa-route" /> AutoNav</h3>
                    <NavItem
                    key="blah"
                    id="navbar-autonav-queue"
                    as={NavLink}
                    className="active"
                    exact="true"
                    style={navbarStyle}
                    >
                      <h4 style={{marginLeft:'35px'}}>Queue List</h4>
                    </NavItem>

                    <NavItem
                    key="blahh"
                    id="navbar-autonav-map"
                    as={NavLink}
                    className="active"
                    exact="true"
                    style={navbarStyle}
                    >
                      <h4 style={{marginLeft:'35px'}}>Map</h4>
                    </NavItem>

                    <NavItem
                    key="blahhh"
                    id="navbar-autonav-waypoints"
                    as={NavLink}
                    className="active"
                    exact="true"
                    style={navbarStyle}
                    >
                      <h4 style={{marginLeft:'35px'}}>Waypoints</h4>
                    </NavItem>
                  </div>


                   <Nav.Item
                      key="fourth"
                      id="navbar-payload"
                      as={NavLink}
                      className="active"
                      exact="true"
                      // to="/payload"
                      style={navbarStyle}
                  >
                    <h3><i className="fa-solid fa-seedling" /> Payload</h3>
                  </Nav.Item>

                  <Nav.Item
                    key="sixth"
                    id="navbar-system"
                    as={NavLink}
                    className="active"
                    exact="true"
                    // to="/system"
                    style={navbarStyle}
                  >
                    <h3><i className="fa-solid fa-wifi"></i> System</h3>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
        </Navbar>
      </>
  );
};

SideNav.propType = {
  mode: PropTypes.string.isRequired,
};

export default SideNav;