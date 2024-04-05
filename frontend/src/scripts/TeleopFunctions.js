import {init_ros_connection} from "../ROSConnection";
import axios from "axios";

class TeleopFunction {
        constructor() {
            this.topic = new window.ROSLIB.Topic({
                ros: init_ros_connection.ros,
                name: init_ros_connection.teleopTopic,
                messageType: "geometry_msgs/Twist",
            });
            this.linSpeed = 0;
            this.angSpeed = 0;

            this.setSpeeds();
        };

        setSpeeds() {
            axios({
                method: "GET",
                url: "http://localhost:9000/linSpeed",
            })
                .then((response) => {
                    this.linSpeed = response.data;
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                });
            axios({
                method: "GET",
                url: "http://localhost:9000/angSpeed",
            })
                .then((response) => {
                    this.angSpeed = response.data;
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                });
        };

    forward() {
        const message = new window.ROSLIB.Message({
            linear: { x: this.linSpeed, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })

        console.log(message);
        //Call velocity this.topic from ROS connection
        this.topic.publish(message);

        return true;
    };

    backward() {
        const message = new window.ROSLIB.Message({
            linear: { x: -this.linSpeed, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })

        console.log(message);
        //Call velocity this.topic from ROS connection
        this.topic.publish(message);

        return true;
    };

    turnLeft() {
        const message = new window.ROSLIB.Message({
            linear: { x: 0.0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: this.angSpeed, },
        })

        console.log(message);
        //Call velocity this.topic from ROS connection
        this.topic.publish(message);

        return true;
    };

    turnRight() {
        const message = new window.ROSLIB.Message({
            linear: { x: 0.0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: -this.angSpeed, },
        })

        console.log(message);
        //Call velocity this.topic from ROS connection
        this.topic.publish(message);

        return true;
    };

    stop() {
        const message = new window.ROSLIB.Message({
            linear: { x: 0, y: 0, z: 0, },
            angular: { x: 0, y: 0, z: 0, },
        })

        console.log(message);
        //Call velocity this.topic from ROS connection
        this.topic.publish(message);

        return false;
    };
    incLinSpeed() {
        axios.put(`http://localhost:9000/linSpeed/increase`).then((response) =>{
            console.log(response.status);
            console.log(response.data);
            this.linSpeed = response.data;
        });
        // console.log(speed);
        return true;
    }

    decLinSpeed() {
        axios.put(`http://localhost:9000/linSpeed/decrease`).then((response) =>{
            console.log(response.status);
            console.log(response.data);
            this.linSpeed = response.data;
        });
        // console.log(speed);
        return true;
    };

    incAngSpeed() {
        axios.put(`http://localhost:9000/angSpeed/increase`).then((response) =>{
            console.log(response.status);
            console.log(response.data);
            this.angSpeed = response.data;
        });
        // console.log(speed);
        return true;
    };
    decAngSpeed() {
        axios.put(`http://localhost:9000/angSpeed/decrease`).then((response) =>{
            console.log(response.status);
            console.log(response.data);
            this.angSpeed = response.data;
        });
        // console.log(speed);
        return true;
    };
}

export const Teleoperation = new TeleopFunction();
