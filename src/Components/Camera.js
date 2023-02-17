import React, {Component} from "react";
import MJPEGCANVAS from "../scripts/mjpegcanvas.min";
import { Rnd } from "react-rnd";

class Camera extends Component {
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
                width: 200,
                height: 200,
                // topic: '/camera/rgb/image_raw',
                topic: this.props.topic,
                ssl: true,
            });
    }

    render() {
        return (
            <div>
              <div id='divCamera' />
            </div>
        );
    }
}

export default Camera;
