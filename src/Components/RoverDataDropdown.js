import React  from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

const RoverDataDropdown = ({ dataType }) => {

  return (
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>Rover Data: {dataType}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Camera Feeds"
                  menuVariant="dark"
              >
                <NavDropdown.Item href="/#/roverdata/chassiscam">Chassis Camera</NavDropdown.Item>
                <NavDropdown.Item href="/#/roverdata/armcam">Arm Camera</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Other Data"
                  menuVariant="dark"
              >
                <NavDropdown.Item href="/#/roverdata/orientation">Orientation</NavDropdown.Item>
                <NavDropdown.Item href="/#/roverdata/speedometer">Speedometer</NavDropdown.Item>
                <NavDropdown.Item href="/#/roverdata/gps">GPS Coordinates</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/#/roverdata/controls">Controls</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

RoverDataDropdown.propTypes = {
  dataType: PropTypes.string.isRequired
};

export default RoverDataDropdown;
