import {init_ros_connection} from "../ROSConnection";
import axios from "axios";

class TeleopFunction {
        constructor() {
            this.topic = new window.ROSLIB.Topic({
                ros: init_ros_connection.ros,
                name: init_ros_connection.cmd_vel_topic,
                messageType: "geometry_msgs/Twist",
            });
        }

    forward(speed) {
        const message = new window.ROSLIB.Message({
            linear: { x: speed, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })

        console.log(this.topic);
        console.log(message);
        //Call velocity this.topic from ROS connection
        this.topic.publish(message);
    };

    backward(speed) {
        const message = new window.ROSLIB.Message({
            linear: { x: -speed, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })

        console.log(message);
        //Call velocity this.topic from ROS connection
        this.topic.publish(message);
    };

    turnLeft(speed) {
        const message = new window.ROSLIB.Message({
            linear: { x: 0.0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: speed, },
        })

        console.log(message);
        //Call velocity this.topic from ROS connection
        this.topic.publish(message);
    };

    turnRight(speed) {
        const message = new window.ROSLIB.Message({
            linear: { x: 0.0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: -speed, },
        })

        console.log(message);
        //Call velocity this.topic from ROS connection
        this.topic.publish(message);
    };

    stop(speed) {
        const message = new window.ROSLIB.Message({
            linear: { x: 0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })

        console.log(message);
        //Call velocity this.topic from ROS connection
        this.topic.publish(message);
    };
    incspeed(speed) {
        axios.put(`http://localhost:9000/speed/increase`).then((response) =>{
            console.log(response.status);
            console.log(response.data);
        });
        // console.log(speed);
    }

    decSpeed(speed) {
        axios.put(`http://localhost:9000/speed/decrease`).then((response) =>{
            console.log(response.status);
            console.log(response.data);
        });
        // console.log(speed);
    };

    incSpeed(speed) {
        axios.put(`http://localhost:9000/speed/increase`).then((response) =>{
            console.log(response.status);
            console.log(response.data);
        });
        // console.log(speed);
    };
    decspeed(speed) {
        axios.put(`http://localhost:9000/speed/decrease`).then((response) =>{
            console.log(response.status);
            console.log(response.data);
        });
        // console.log(speed);
    };
}

export const Teleoperation = new TeleopFunction();
