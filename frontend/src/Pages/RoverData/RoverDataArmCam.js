import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import RoverDataDropdown from "../../Components/RoverDataDropdown";
import Camera from "../../Components/Camera";
import { init_ros_connection } from "../../ROSConnection";

class RoverDataArmCam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCamera: "cam3",
      isDropdownOpen: false,
    };
  }

  handleCameraChange = (camera) => {
    this.setState({ selectedCamera: camera, isDropdownOpen: false });
  };

  handleDropdownToggle = () => {
    this.setState((prevState) => ({ isDropdownOpen: !prevState.isDropdownOpen }));
  };

  render() {
    const { selectedCamera, isDropdownOpen } = this.state;
    const rosbridgeServerIp = init_ros_connection.rosbridge_server_ip;

    let topic = '';

    if (rosbridgeServerIp) {
      if (selectedCamera === "cam3") {
        topic = init_ros_connection.cmd_cam_topics.cam3;
      } else if (selectedCamera === "cam5") {
        topic = init_ros_connection.cmd_cam_topics.cam5;
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div id="rover-data-arm-cam">
              <RoverDataDropdown
                dataType="Arm Camera"
                onSelectCamera={this.handleCameraChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="dropdown">
              <button
                className="btn btn-info dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                onClick={this.handleDropdownToggle}
              >
                Camera Topic
              </button>
              <div
                className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`}
                aria-labelledby="dropdownMenuButton"
              >
                <Link
                  to={`/camera/${init_ros_connection.cmd_cam_topics.cam3}`}
                  className="dropdown-item"
                >
                  Cam 3
                </Link>
                <Link
                  to={`/camera/${init_ros_connection.cmd_cam_topics.cam5}`}
                  className="dropdown-item"
                >
                  Cam 5
                </Link>
              </div>
            </div>
            <Camera
              host={rosbridgeServerIp}
              topic={topic}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RoverDataArmCam;
