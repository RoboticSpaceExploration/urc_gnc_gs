import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import RoseLogo from '../rose-logo.png';
import AutoNavLogo from '../autonav.png';
import RoverDataLogo from '../rover-data.png';
import PayloadLogo from '../payload.png';
import ArmLogo from '../arm.png';

const SideNav = (props) => {
  return (
	  <div className="sidenav">
	    <img src={RoseLogo} className="rose-logo" alt="rose-logo" />
	    <Link to={{pathname: '/roverdata'}}>
	    	<img src={RoverDataLogo} className="rose-logo" alt="roverdata-logo" />
	    </Link>
	    <Link to={{pathname: '/autonav'}}>
	    	<img src={AutoNavLogo} className="rose-logo" alt="autonav-logo" />
	    </Link>
	    <Link to={{pathname: '/payload'}}>
	    	<img src={PayloadLogo} className="rose-logo" alt="payload-logo"/>
	    </Link>
	    <Link to={{pathname: '/arm'}}>
	    	<img src={ArmLogo} className="rose-logo" alt="arm-logo"/>
	    </Link>
	  </div>
  );
};

export default SideNav;
