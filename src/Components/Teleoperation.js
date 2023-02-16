import React, {Component, KeyboardEvent} from "react";
import { Joystick } from 'react-joystick-component';
import Config from "../scripts/config";

class Teleoperation extends Component {
    state = {ros: null };

    constructor() {
        super();
        this.init_connection();

        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }
    
    init_connection(){
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", ()=> {
            console.log("connection established in Teleoperation Component");
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

    setTopic(event) {
        this.topic = new ROSLIB.Topic({
            ros: this.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: 'geometry_msgs/Twist'
        })
    };

    onKeyDown(event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case 68: //d
                setKeyD(true)
                break;
            case 83: //s
                setKeyS(true)
                break;
            case 65: //a
                setKeyA(true)
                break;
            case 87: //w
                setKeyW(true)
                break;
            default:
                setKeyW(false)
                setKeyA(false)
                setKeyS(false)
                setKeyD(false)
                break;
        }
    };

    onKeyUp(event) {
        var keyCode = event.keyCode;

        switch (keyCode) {
            case 68: //d
                setKeyD(false)
                break;
            case 83: //s
                setKeyS(false)
                break;
            case 65: //a
                setKeyA(false)
                break;
            case 87: //w
                setKeyW(false)
                break;
            default:
                setKeyW(false)
                setKeyA(false)
                setKeyS(false)
                setKeyD(false)
                break;
        }
    };

    //Teleop control with keyboard
    forward(event) {
        this.message = new ROSLIB.Message({
            linear: { x: 0.15, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })
        this.setTopic()
        this.topic.publish(this.message)
    };

    stop(event) {
        this.message = new ROSLIB.Message({
            linear: { x: 0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })
        this.setTopic()
        this.topic.publish(this.message)
    };

    backward(event) {
        this.message = new ROSLIB.Message({
            linear: { x: -0.15, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })
        this.setTopic()
        this.topic.publish(this.message)
    };

    turnLeft(event) {
        this.message = new ROSLIB.Message({
            linear: { x: 0.0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0.2, },
        })
        this.setTopic()
        this.topic.publish(this.message)
    }; 

    turnRight(event) {
        this.message = new ROSLIB.Message({
            linear: { x: 0.0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: -0.2, },
        })
        this.setTopic()
        this.topic.publish(this.message)
    };

    render() {
        return ( <div>
            <Joystick 
            size={100} 
            sticky={true} 
            baseColor="#EEEEEE" 
            stickColor="#BBBBBB" 
            move={this.handleMove} 
            stop={this.handleStop}
            ></Joystick>
        </div>)
    }
}

export default Teleoperation;