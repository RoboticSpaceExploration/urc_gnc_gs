import React from "react";
import RoverDataDropdown from "../../Components/RoverDataDropdown";
import Camera from "../../Components/Camera";
import { init_ros_connection } from "../../ROSConnection";

class RoverDataChassisCam extends React.Component {
  render() {
    return (
        <div id="rover-data-chassis-cam">
          <RoverDataDropdown />
          <Camera host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam6}/>
        </div>
    );
  }
}

export default RoverDataChassisCam;
