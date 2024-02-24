import React from "react";
import MJPEGCANVAS from "../scripts/mjpegcanvas.min";
import { Rnd } from "react-rnd";
import ReactPlayer from 'react-player';

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.camera = null;
    }

    //used to display camera feed
    componentDidMount(){
      this.setCamera();
    }

    setCamera() {
            this.camera = new MJPEGCANVAS.Viewer({
                divID: 'divCamera',
                host: this.props.host,
                width: 600,
                height: 450,
                type: 'ros_compressed',
                topic: this.props.topic,
                ssl: true,
            });
            // this.camera = <ReactPlayer url = 'rtsp://192.168.0.112:8554/ts.m3u8'/>
    }

    render() {
        return (
            <div>
              <div id='divCamera'/>
            </div>
        );
    }
}

export default Camera;
