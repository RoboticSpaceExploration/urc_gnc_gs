import React, { useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import { Button, Navbar, Offcanvas, Image, Nav, ButtonGroup, ToggleButton, OverlayTrigger, Popover, ListGroup, NavItem } from "react-bootstrap";
import PropTypes from 'prop-types';
import RoseLogo from "../Images/rose-logo.png";

const SideNav = ({ mode }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const camera1 = 'left=0, top=0, width=750, height=400';
  const camera2 = 'left=1000, top=0, width=750, height=400';
  const otherFeats = 'left=0, top=500, width=750, height=400';
  const controlFeats = 'left=1000, top=500, width=750, height=400';
  const imageStyle = { width: "85px", height: "80px", marginLeft: '10px', marginRight: '10px' }
  const navbarStyle = { textDecoration: 'none', color: '#ab2c94' }
  const logoStyle = { padding: 0, hover: 'none', boxShadow: 'none', boxShadowColor: 'none', margin: 'none' }


  return (
      <>
        <Navbar bg={mode} style={{ display: 'flex',position: '-webkit-sticky', top:15}}>

              <div style={{paddingTop:10}}>
                <Nav variant="pills" className="flex-column" >
                  <Nav.Item
                      key="first"
                      id="navbar-rose-logo"
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
                    style={navbarStyle}
                  >
                    <h3><i className="fa-solid fa-wifi"></i> System</h3>
                  </Nav.Item>
                </Nav>
              </div>
        </Navbar>
      </>
  );
};

SideNav.propType = {
  mode: PropTypes.string.isRequired,
};

export default SideNav;
