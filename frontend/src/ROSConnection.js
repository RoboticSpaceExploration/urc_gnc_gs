class ROSConnection {
    constructor() {
        this.ros = null;
        this.connected = false;

        // Rover
        // this.rosbridge_server_ip = "192.168.0.207";
        this.rosbridge_server_ip = "192.168.1.2";
        //RoSE Lab Computer IP
        // this.rosbridge_server_ip = "192.168.0.176";

        //Simulation ip
        // this.rosbridge_server_ip = "192.168.0.223";
        //this.cmd_vel_topic = "/gnc_robot/gnc_robot_velocity_controller/cmd_vel";

        //Thinkpad laptop ip
        // this.rosbridge_server_ip = "192.168.3.2";

        //TX2 IP
        //this.rosbridge_server_ip = "192.168.0.156";

        //Xavier IP
        //this.rosbridge_server_ip = "192.168.2.2"
        // this.rosbridge_server_ip = "192.168.0.184"

        //this.rosbridge_server_ip

        this.rosbridge_server_port = "9090";
        this.reconnection_timer = 3000;
        this.cmd_vel_topic = "/gnc_robot/gnc_wheel_velocity_controller/cmd_vel";

        //Arm Control topic
        this.arm_cmd_topics = {
           joint1: "/arm/joint1_position_controller/command",
           joint2: "/arm/joint2_position_controller/command",
           joint3: "/arm/joint3_position_controller/command",
           joint4: "/arm/joint4_position_controller/command",
           joint5: "/arm/joint5_position_controller/command",
           joint6: "/arm/joint6_position_controller/command",
        };

        //Camera topics
        this.cmd_cam_topics = {
            cam1: "/zed2/zed_node/imu/data",
            cam2: "/zed2/zed_node/rgb/image_rect_color",
            cam3: "/camera1/usb_cam1/image_raw",
            cam4: "/camera2/usb_cam2/image_raw",
            cam5: "/camera3/usb_cam3/image_raw",
            cam6: "/camera4/usb_cam4/image_raw",
        };

        this.init_connection();
    }
    init_connection(){
        this.ros = new window.ROSLIB.Ros();
        this.ros.on("connection", ()=> {
                console.log("connection established");
                this.connected = true;
            }
        );

        this.ros.on("close", ()=> {
            console.log("connection is closed");
            this.connected = false;
            //try to reconnect every 3 seconds
            setTimeout(()=> {
                try {
                    this.ros.connect(
                        `ws://${this.rosbridge_server_ip}:${this.rosbridge_server_port}`
                    );
                }
                catch (error){
                    console.log("connection problem");
                }
            }, this.reconnection_timer);

        });

        try {
            this.ros.connect(
                `ws://${this.rosbridge_server_ip}:${this.rosbridge_server_port}`
            );
        }
        catch (error) {
            console.log("connection problem");
        }
    }
}

/**
 * The singleton instance of the ROSConnection.
 * @type {init_ros_connection}
 */
export const init_ros_connection = new ROSConnection();
