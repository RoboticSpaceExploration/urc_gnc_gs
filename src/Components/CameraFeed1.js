import React, {Component} from "react";
import Config from "../scripts/config";
import ROSLIB, {ros} from 'roslib'; 

class CameraFeedOne extends Component {
    state = {ros: null };

    constructor() {
        super();
        this.init_connection();

        // this.listen = this.listen.bind(this);
    }
    
    init_connection(){
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", ()=> {
            console.log("connection established in Camera Feed Component");
            console.log(this.state.ros);
            this.setState({connected: true }); 
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

        });

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
    }

    listen(event) {
        // var cam_listener = new window.ROSLIB.Topic({
        //     ros: this.state.ros,
        //     name: Config.CMD_CAM_TOPIC,
        //     messageType: "sensor_msgs/Image",
        // });
    
        // cam_listener.subscribe(function(m) {
        //     document.getElementById("msg").innerHTML = m.data;
        //   });

        var txt_listener = new ROSLIB.Topic({
            ros : ros,
            name : '/txt_msg',
            messageType : 'std_msgs/String'
          });
        
          txt_listener.subscribe(function(m) {
            document.getElementById("msg").innerHTML = m.data;
          });
    }

    render() {
        return ( <div>
            <h1>
                Test message: <span id="msg"></span>
            </h1>
            </div>
        )
    }

}

export default CameraFeedOne;