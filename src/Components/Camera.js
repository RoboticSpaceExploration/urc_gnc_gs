import React, {Component} from "react";
import Config from "../scripts/config";
import MJPEGCANVAS from "../scripts/mjpegcanvas.min";
import { Rnd } from "react-rnd";

class Camera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ros: null,
            connected: false,
            camera: null,
            // rosbridge_address: "ws://"+ Config.ROSBRIDGE_SERVER_IP+ ":"+ Config.ROSBRIDGE_SERVER_PORT+"",
        };
        this.init_connection();
        //this.setCamera();
    }

    //used to display camera feed
    componentDidMount(){
      this.setCamera();
    }

    init_connection(){
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);
        try {
            this.state.ros.connect(
                "ws://"+
                Config.ROSBRIDGE_SERVER_IP+
                ":"+
                Config.ROSBRIDGE_SERVER_PORT+
                ""
            );
        }
        catch (error ){
            console.log("connection problem");
        }
        this.state.ros.on("connection", ()=> {
            console.log("connection established in Camera Feed Component");
            console.log(this.state.ros);
            this.setState({connected: true });
            // this.setCamera();
        });

        this.state.ros.on("close", ()=> {
            console.log("connection is closed");
            this.setState({connected: false });

            //try to reconnect every 3 seconds
            setTimeout(()=> {
                try {
                    this.state.ros.connect(
                        "ws://"+
                        Config.ROSBRIDGE_SERVER_IP+
                        ":"+
                        Config.ROSBRIDGE_SERVER_PORT+
                        ""
                    );
                }
                catch (error ){
                    console.log("connection problem");
                }
            }, Config.RECONNECTION_TIMER);
            document.getElementById('divCamera').innerHTML = '';
        });
    }

    setCamera() {
        // let without_ws = this.state.rosbridge_address.split('ws://')[1]
        //     console.log("without_ws: " + without_ws);
        //     let domain = without_ws.split('/')[0] + '/' + without_ws.split('/')[1];
        //     console.log("domain: " + domain);
            let host = "192.168.0.223";
            console.log("host: " + host);
            console.log("topic: " + Config.CMD_CAM_TOPIC);
            this.camera = new MJPEGCANVAS.Viewer({
                divID: 'divCamera',
                host: host,
                width: 200,
                height: 200,
                // topic: '/camera/rgb/image_raw',
                topic: this.props.topic,
                ssl: true,
            });
    }

    render() {
        return (
            <div id='divCamera'></div>
        );
    }
}

export default Camera;
