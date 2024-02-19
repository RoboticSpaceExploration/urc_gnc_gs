import React from "react";
import RoverDataDropdown from "../../Components/RoverDataDropdown";
import Camera from "../../Components/Camera";
import { init_ros_connection } from "../../ROSConnection"


class RoverDataChassisCam extends React.Component {
  render() {
    return (
        <div id="rover-data-chassis-cam">
          <RoverDataDropdown dataType="Chassis Camera"/>
            {/*<h2>{init_ros_connection.rosbridge_server_ip}</h2>*/}
            {/*<h2>{init_ros_connection.cmd_cam_topics.cam8}</h2>*/}
          <Camera host={init_ros_connection.rosbridge_server_ip} topic={init_ros_connection.cmd_cam_topics.cam8}/>
          {/* <Camera/> */}
        </div>
    );
  }
}

export default RoverDataChassisCam;
