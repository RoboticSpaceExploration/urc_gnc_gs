import React from 'react';
import { Row, Button } from 'react-bootstrap';
import Camera from "../Components/Camera";
import { init_ros_connection } from '../ROSConnection';
import SideNav from "../Components/SideNav";

class Arm extends React.Component {
  render() {
      const controls = 'left=100, top=100, width=1520, height=860';
    return (
        <div>
            <SideNav/>
            <Button onClick={()=> window.open('/#/arm/controls','controls', controls)}>
                Open Arm Controls
            </Button>
          <Row>
            <Camera host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam3}/>
            <Camera host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam5}/>
          </Row>
        </div>
    );
  };
}

export default Arm;

