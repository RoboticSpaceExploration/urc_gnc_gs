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

const SideNav = (props) => {
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
                as={NavLink}
                className="active"
                exact="true"
                to="/roverdata"
              >
                <Image src={RoverDataLogo} className="sidenav-logos" />
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
