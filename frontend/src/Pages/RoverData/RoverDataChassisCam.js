import React from "react";
import Camera from "../../Components/Camera";
import { init_ros_connection } from "../../ROSConnection"


class RoverDataChassisCam extends React.Component {
  render() {
    return (
        <div id="chassis-cam">
          <Camera host={init_ros_connection.cameraHostName} topic={init_ros_connection.cameraTopics.cam3}/>
        </div>
    );
  }
}

export default RoverDataChassisCam;
