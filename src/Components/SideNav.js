import React from 'react';
import { NavLink } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import RoseLogo from '../Images/rose-logo.png';
import AutoNavLogo from '../Images/autonav.png';
import RoverDataLogo from '../Images/rover-data.png';
import PayloadLogo from '../Images/payload.png';
import ArmLogo from '../Images/arm.png';

const SideNav = (props) => {
  return (
    <div className="sidenav">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col>
            <Nav variant="pills" className="flex-column">
              <Nav.Item eventKey="first" id="navbar-rose-logo" as={NavLink} activeClassName="active" exact to="/home">
                  <Image src={RoseLogo} className="sidenav-logos" />
              </Nav.Item>
              <Nav.Item eventKey="second" id="navbar-rover-data" as={NavLink} activeClassName="active" exact to="/roverdata">
                  <Image src={RoverDataLogo} className="sidenav-logos" />
              </Nav.Item>
              <Nav.Item eventKey="third" id="navbar-autonav" as={NavLink} activeClassName="active" exact to="/autonav">
                  <Image src={AutoNavLogo} className="sidenav-logos" />
              </Nav.Item>
              <Nav.Item eventKey="fourth" id="navbar-payload" as={NavLink} activeClassName="active" exact to="/payload">
                  <Image src={PayloadLogo} className="sidenav-logos" />
              </Nav.Item>
              <Nav.Item eventKey="fifth" id="navbar-arm" as={NavLink} activeClassName="active" exact to="/arm">
                  <Image src={ArmLogo} className="sidenav-logos" />
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default SideNav;
