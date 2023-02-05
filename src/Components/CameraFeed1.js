import React, {Component} from "react";
import Config from "../scripts/config";
// import { Image } from "react-bootstrap";

class CameraFeedOne extends Component {
    state = {
        ros: null 
    };

    constructor() {
        super();
        this.init_connection();
        this.state.image = { src: ""};
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

    componentDidMount() {
        setTimeout(() => {
            this.listen();
          }, 1000);
    }x

    listen() {
        console.log("listen");
        var cam_listener = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_CAM_TOPIC,
            messageType: "sensor_msgs/Image",
        });
    

        cam_listener.subscribe(function(m) {
            // document.getElementById("msg").innerHTML = m.data;
            console.log(m.data);
            // console.log('Hi')
            this.state.image.src = "data:image/jpg;base64," + m.data;
            cam_listener.unsubscribe();
          });

        // cam_listener.subscribe(function(message) {
        //     document.write("<p>Received message on ${listener.name}: ${message.data}</p>"); 
        // });


        // var listener = new window.ROSLIB.Topic({
        //     ros : this.state.ros,
        //     name : '/txt_msg',
        //     messageType : 'std_msgs/String'
        //   });
        
        //   listener.subscribe(function(message) {
        //     // document.getElementById("msg").innerHTML = message.data;
        //     console.log('Received message on ' + listener.name + ': ' + message.data); 
        //   });
    }

    render() {
        return ( 
            <div>
                <img id="my_image" style='height: 100%; width: 100%; object-fit: contain' src="assets/img/placeholder.png">{ this.image }</img>
                <h1>Hi</h1>
            </div>
        )
    }

}

export default CameraFeedOne;