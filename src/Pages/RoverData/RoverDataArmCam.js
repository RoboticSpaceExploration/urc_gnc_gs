import React from "react";
import RoverDataDropdown from "../../Components/RoverDataDropdown";
import Camera from "../../Components/Camera";
import { init_ros_connection } from "../../ROSConnection";

class RoverDataArmCam extends React.Component {
  render() {
    return (
        <div id="rover-data-arm-cam">
          <RoverDataDropdown dataType="Arm Camera"/>
          <Camera host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam3}/>
          <Camera host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam5}/>
        </div>
    );
  }
}

export default RoverDataArmCam;
