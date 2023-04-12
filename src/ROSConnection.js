class ROSConnection {
    constructor() {
        this.ros = null;
        this.connected = false;

        //Simulation ip
        //this.rosbridge_server_ip = "192.168.0.223";

        //Rover ip
        //this.rosbridge_server_ip = "172.17.0.1";

        //Laptop ip
        this.rosbridge_server_ip = "192.168.3.2";

        //

        this.rosbridge_server_port = "9090";
        this.reconnection_timer = 3000;

        this.cmd_vel_topic = "/gnc_robot/gnc_robot_velocity_controller/cmd_vel";

        // this.cmd_vel_topic = "/gnc_robot/gnc_wheel_velocity_controller/cmd_vel";


            // cmd_cam_topic: "/d435i/color/image_raw/compressed",
        this.cmd_cam_topics = {
            //cam1: "/camera/ired1/image_raw",
            //cam1: "d435i/color/image_raw",

            cam1: "/zedm/zed_node/right_raw/image_raw_color",
            cam2: "/zedm/zed_node/right_raw/image_raw_gray",
            cam3: "/camera/ired2/image_raw",
            cam4: "/camera_z/color/image_raw",
            cam5: "/camera_z/fisheye2/image_raw",
            cam6: "/teleop_cam/image_raw"
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
                catch (error ){
                    console.log("connection problem");
                }
            }, this.reconnection_timer);

        });

        try {
            this.ros.connect(
                `ws://${this.rosbridge_server_ip}:${this.rosbridge_server_port}`
            );
        }
        catch (error ) {
            console.log("connection problem");
        }
    }
}

/**
 * The singleton instance of the ROSConnection.
 * @type {init_ros_connection}
 */
export const init_ros_connection = new ROSConnection();
