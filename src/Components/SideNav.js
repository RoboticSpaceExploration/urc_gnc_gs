import React from "react";
import { NavLink } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import RoseLogo from "../Images/rose-logo.png";
import AutoNavLogo from "../Images/autonav.png";
import RoverDataLogo from "../Images/rover-data.png";
import PayloadLogo from "../Images/payload.png";
import ArmLogo from "../Images/arm.png";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';

const SideNav = (props) => {
  const popover = (
      <Popover id="popover-basic">
        <Popover.Body>
          <ListGroup variant="flush">
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/chassiscam','cameraChassis', 'popup')}>Camera Feed on Chassis</ListGroup.Item>
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/armcam','cameraArm', 'popup')}>Camera Feed on Arm</ListGroup.Item>
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/gps','gps', 'popup')}>Current GPS Coordinates</ListGroup.Item>
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/orientation','orientation', 'popup')}>Orientation</ListGroup.Item>
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/speedometer','speedometer', 'popup')}>Speedometer</ListGroup.Item>
            <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata/controls','controls', 'popup')}>Controls</ListGroup.Item>
          </ListGroup>
        </Popover.Body>
      </Popover>
  );

  return (
      <div className="sidenav">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <Nav variant="pills" className="flex-column">
                <Nav.Item
                    key="first"
                    id="navbar-rose-logo"
                    as={NavLink}
                    className="active"
                    exact="true"
                    to="/"
                >
                  <Image src={RoseLogo} className="sidenav-logos" />
                </Nav.Item>
                <Nav.Item
                    key="second"
                    id="navbar-rover-data"
                    as={NavLink}
                    className="active"
                    exact="true"
                >
                  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                    {/*<Button variant="link" >*/}
                      <Image src={RoverDataLogo} className="sidenav-logos" />
                    {/*</Button>*/}
                  </OverlayTrigger>
                </Nav.Item>
                <Nav.Item
                    key="third"
                    id="navbar-autonav"
                    as={NavLink}
                    className="active"
                    exact="true"
                    to="/autonav"
                >
                  <Image src={AutoNavLogo} className="sidenav-logos" />
                </Nav.Item>
                <Nav.Item
                    key="fourth"
                    id="navbar-payload"
                    as={NavLink}
                    className="active"
                    exact="true"
                    to="/payload"
                >
                  <Image src={PayloadLogo} className="sidenav-logos" />
                </Nav.Item>
                <Nav.Item
                    key="fifth"
                    id="navbar-arm"
                    as={NavLink}
                    className="active"
                    exact="true"
                    to="/arm"
                >
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
