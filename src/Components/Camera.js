import React, {Component} from "react";
import Config from "../scripts/config";
import MJPEGCANVAS from "../scripts/m"

class Camera extends Component {
    state = {
        ros: null, 
        rosbridge_address: "ws://"+ Config.ROSBRIDGE_SERVER_IP+ ":"+ Config.ROSBRIDGE_SERVER_PORT+"",
    };

    constructor() {
        super();
        this.init_connection();
        this.setCamera();
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

    setCamera() {
        let without_ws = this.rosbridge_address.split('ws://')[1]
            console.log(without_ws)
            let domain = without_ws.split('/')[0] + '/' + without_ws.split('/')[1]
            console.log(domain)
            let host = domain + '/cameras'
            let viewer = new MJPEGCANVAS.Viewer({
                divID: 'divCamera',
                host: host,
                width: 320,
                height: 240,
                // topic: '/camera/rgb/image_raw',
                topic: Config.CMD_CAM_TOPIC,
                ssl: true,
            })
    }

    render() {
        return ( 
            <div>
                <img id = 'divCamera'></img>
            </div>
        )
    }
}

export default Camera

// var app = new Vue({
//     // storing the state of the page
//     data: {
//         connected: false,
//         ros: null,
//         logs: [],
//         loading: false,
//         topic: null,
//         message: null,
//         rosbridge_address: 'ws://0.0.0.0:9090',
      
//     },
//     // helper methods to connect to ROS
//     methods: {
//         connect: function() {
//             this.loading = true
//             this.ros = new ROSLIB.Ros({
//                 url: this.ws_address
//             })
//             this.ros.on('connection', () => {
//                 this.logs.unshift((new Date()).toTimeString() + ' - Connected!')
//                 this.connected = true
//                 this.loading = false
//                 this.setCamera()
//             })
//             this.ros.on('error', (error) => {
//                 this.logs.unshift((new Date()).toTimeString() + ` - Error: ${error}`)
//             })
//             this.ros.on('close', () => {
//                 this.logs.unshift((new Date()).toTimeString() + ' - Disconnected!')
//                 this.connected = false
//                 this.loading = false
//                 document.getElementById('divCamera').innerHTML = ''
//             })
//         },
//         disconnect: function() {
//             this.ros.close()
//         },
//         // setTopic: function() {
//         //     this.topic = new ROSLIB.Topic({
//         //         ros: this.ros,
//         //         name: '/cmd_vel',
//         //         messageType: 'geometry_msgs/Twist'
//         //     })
//         // },
//         // forward: function() {
//         //     this.message = new ROSLIB.Message({
//         //         linear: { x: 0.15, y: 0, z: 0, },
//         //         angular: { x: 0, y: 0, z: 0, },
//         //     })
//         //     this.setTopic()
//         //     this.topic.publish(this.message)
//         // },
//         // stop: function() {
//         //     this.message = new ROSLIB.Message({
//         //         linear: { x: 0, y: 0, z: 0, },
//         //         angular: { x: 0, y: 0, z: 0, },
//         //     })
//         //     this.setTopic()
//         //     this.topic.publish(this.message)
//         // },
//         // backward: function() {
//         //     this.message = new ROSLIB.Message({
//         //         linear: { x: -0.15, y: 0, z: 0, },
//         //         angular: { x: 0, y: 0, z: 0, },
//         //     })
//         //     this.setTopic()
//         //     this.topic.publish(this.message)
//         // },
//         // turnLeft: function() {
//         //     this.message = new ROSLIB.Message({
//         //         linear: { x: 0.0, y: 0, z: 0, },
//         //         angular: { x: 0, y: 0, z: 0.2, },
//         //     })
//         //     this.setTopic()
//         //     this.topic.publish(this.message)
//         // },
//         // turnRight: function() {
//         //     this.message = new ROSLIB.Message({
//         //         linear: { x: 0.0, y: 0, z: 0, },
//         //         angular: { x: 0, y: 0, z: -0.2, },
//         //     })
//         //     this.setTopic()
//         //     this.topic.publish(this.message)
//         // },
//         setCamera: function() {
//             let without_ws = this.rosbridge_address.split('ws://')[1]
//             console.log(without_ws)
//             let domain = without_ws.split('/')[0] + '/' + without_ws.split('/')[1]
//             console.log(domain)
//             let host = domain + '/cameras'
//             let viewer = new MJPEGCANVAS.Viewer({
//                 divID: 'divCamera',
//                 host: host,
//                 width: 320,
//                 height: 240,
//                 // topic: '/camera/rgb/image_raw',
//                 topic: CMD_CAM_TOPIC,
//                 ssl: true,
//             })
//         },
//     },
//     mounted() {
//     },
// })
