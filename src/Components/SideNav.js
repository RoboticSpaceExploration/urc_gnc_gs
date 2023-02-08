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
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ListGroup from 'react-bootstrap/ListGroup';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Camera from './Camera';
import CameraFeed1 from './CameraFeed1';
import GPSCoordinates from './GPSCoordinates';
import Compass from './Compass';
import Speedometer from './Speedometer';

const SideNav = (props) => {
  const popover = (
      <Popover id="popover-basic">
        <Popover.Body>
          {/*<ListGroup variant="flush">*/}
          {/*  <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata','cameraChassis', 'popup')}>Camera Feed on Chassis</ListGroup.Item>*/}
          {/*  <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata','cameraArm', 'popup')}>Camera Feed on Arm</ListGroup.Item>*/}
          {/*  <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata','gps', 'popup')}>Current GPS Coordinates</ListGroup.Item>*/}
          {/*  <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata','orientation', 'popup')}>Orientation</ListGroup.Item>*/}
          {/*  <ListGroup.Item as={'button'} action onClick={()=> window.open('/#/roverdata','speedometer', 'popup')}>Speedometer</ListGroup.Item>*/}
          {/*</ListGroup>*/}
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<ul>
                <br />
                <li>
                  <Link to='roverdata/chassiscam' target='_blank'>
                    Camera Feed on Chassis
                  </Link>
                </li>
                <br />
                <li>
                  <Link to='roverdata/armcam' target='_blank'>
                    Camera Feed on Arm
                  </Link>
                </li>
                <br />
                <li>
                  <Link to='roverdata/gps' target='_blank'>
                    Current GPS Coordinates
                  </Link>
                </li>
                <br />
                <li>
                  <Link to='roverdata/orientation' target='_blank'>
                    Orientation
                  </Link>
                </li>
                <br />
                <li>
                  <Link to='roverdata/speedometer' target='_blank'>
                    Speedometer
                  </Link>
                </li>
              </ul>}>
              </Route>
              <Route exact path='/roverdata/chassiscam' element={<Camera />}></Route>
              <Route exact path='/roverdata/armcam' element={<CameraFeed1 />}></Route>
              <Route exact path='/roverdata/gps' element={<GPSCoordinates/>}></Route>
              <Route exact path='/roverdata/orientation' element={<Compass />}></Route>
              <Route exact path='/roverdata/speedometer' element={<Speedometer />}></Route>
            </Routes>
          </BrowserRouter>
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
                    to="/home"
                >
                  <Image src={RoseLogo} className="sidenav-logos" />
                </Nav.Item>
                <Nav.Item
                    key="second"
                    id="navbar-rover-data"
                >
                  <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                  <Image src={RoverDataLogo} className="sidenav-logos" />
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
