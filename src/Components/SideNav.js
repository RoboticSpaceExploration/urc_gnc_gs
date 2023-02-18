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
  const camera1 = 'left=0, top=0, width=750, height=400';
  const camera2 = 'left=1000, top=0, width=750, height=400';
  const otherFeats = 'left=0, top=500, width=750, height=400';
  const controlFeats = 'left=1000, top=500, width=750, height=400';

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

  const navbarStyle = { width: "7vw"}
  const imageStyle = {width: "7vw", height: "15vh"}

  return (
      <div className="sidenav" style={navbarStyle}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <Nav variant="pills" className="flex-column" >
                <Nav.Item
                    key="first"
                    id="navbar-rose-logo"
                    as={NavLink}
                    className="active"
                    exact="true"
                    to="/"
                >
                  <Image src={RoseLogo} className="sidenav-logos" style={imageStyle}/>
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
                      <Image src={RoverDataLogo} className="sidenav-logos" style={imageStyle} />
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
                  <Image src={AutoNavLogo} className="sidenav-logos" style={imageStyle} />
                </Nav.Item>
                <Nav.Item
                    key="fourth"
                    id="navbar-payload"
                    as={NavLink}
                    className="active"
                    exact="true"
                    to="/payload"
                >
                  <Image src={PayloadLogo} className="sidenav-logos" style={imageStyle}/>
                </Nav.Item>
                <Nav.Item
                    key="fifth"
                    id="navbar-arm"
                    as={NavLink}
                    className="active"
                    exact="true"
                    to="/arm"
                >
                  <Image src={ArmLogo} className="sidenav-logos" style={imageStyle}/>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
      </div>
  );
};

export default SideNav;
