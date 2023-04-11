import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Camera from "../Components/Camera";
import ReactNipple from 'react-nipple';
import { init_ros_connection } from '../ROSConnection';
import SideNav from "../Components/SideNav";

class Arm extends React.Component {

  render() {
    return (
        <div>
            <SideNav/>
          <Row>
            <Camera host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam3}/>
            <Camera host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam5}/>

            <ReactNipple
                options={{
                  mode: 'static',
                  position: { bottom: '-30%', left: '45%' },
                  color: "black"
                }}
                style={{
                  width: 150,
                  height: 150,
                }}
            />
            <ReactNipple
                options={{
                  mode: 'static',
                  position: { bottom: '-30%', left: '55%' },
                  color: "black"
                }}
                style={{
                  width: 150,
                  height: 150,
                }}
            />

          </Row>
        </div>
    );
  };
}

export default Arm;

