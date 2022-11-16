import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import RoseLogo from '../Images/rose-logo.png';
import AutoNavLogo from '../Images/autonav.png';
import RoverDataLogo from '../Images/rover-data.png';
import PayloadLogo from '../Images/payload.png';
import ArmLogo from '../Images/arm.png';

const SideNav = (props) => {
  return (
    <div className="sidenav">
      <Menu vertical inverted attached="left">
        <Menu.Item id="navbar-rose-logo" as={NavLink} activeClassName="active" exact to="/home">
          <Image src={RoseLogo} size="small"/>
        </Menu.Item>
        <Menu.Item id="navbar-rover-data" as={NavLink} activeClassName="active" exact to="/roverdata">
          <Image src={RoverDataLogo}  size="small"/>
        </Menu.Item>
        <Menu.Item id="navbar-autonav" as={NavLink} activeClassName="active" exact to="/autonav">
          <Image src={AutoNavLogo} size="small"/>
        </Menu.Item>
        <Menu.Item id="navbar-payload" as={NavLink} activeClassName="active" exact to="/payload">
          <Image src={PayloadLogo}  size="small"/>
        </Menu.Item>
        <Menu.Item id="navbar-arm" as={NavLink} activeClassName="active" exact to="/arm">
          <Image src={ArmLogo} size="small"/>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideNav;
