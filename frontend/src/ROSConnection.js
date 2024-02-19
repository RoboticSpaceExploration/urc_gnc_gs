class ROSConnection {
    constructor() {
        this.ros = null;
        this.connected = false;

        // Rover
        this.rosbridge_server_ip = "192.168.0.207";
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

        //this.arm1_topic = "/arm/joint1_position_controller/command";

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
            // cmd_cam_topic: "/d435i/color/image_raw/compressed",
        this.cmd_cam_topics = {
            //cam1: "/camera/ired1/image_raw",
            //cam1: "d435i/color/image_raw",
            cam8: "/zedm/zed_node/rgb/image_rect_color",
            cam1: "/zedm/zed_node/right_raw/image_raw_color",
            cam2: "/zedm/zed_node/right_raw/image_raw_gray",
            cam3: "/camera/ired2/image_raw",
            cam4: "/camera_z/color/image_raw",
            cam5: "/camera_z/fisheye2/image_raw",
            cam6: "/teleop_cam/image_raw",

            cam7: "/arm/camera/image_raw"
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
