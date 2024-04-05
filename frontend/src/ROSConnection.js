class ROSConnection {
    constructor() {
        this.ros = null;
        this.connected = false;
        this.rosbridgeServerIP = "xavier";
        this.cameraHostName = "rosecamera";

        this.rosbridgeServerPort = "9090";
        this.reconnectionTimer = 3000;
        this.teleopTopic = "/gnc_robot/gnc_drive_velocity_controller/cmd_vel";

        //Camera topics
        this.cameraTopics = {
            cam1: "/zed2/zed_node/imu/data",
            cam2: "/zed2/zed_node/rgb/image_rect_color",
            cam3: "/camera1/usb_cam1/image_raw",
            cam4: "/camera2/usb_cam2/image_raw",
            cam5: "/camera3/usb_cam3/image_raw",
            cam6: "/camera4/usb_cam4/image_raw",
        };

        this.diagnosticTopics = {
            cpuTemp: "/cpu/temps",
            cpuUsage: "/cpu/utilization",
            gpuTemp: "/gpu/temps",
            gpuUsage: "/gpu/utilization",
            latency: "/network/xavier/latency",
        }
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
            // try to reconnect every 3 seconds
            setTimeout(()=> {
                try {
                    this.ros.connect(
                        `ws://${this.rosbridgeServerIP}:${this.rosbridgeServerPort}`
                    );
                }
                catch (error){
                    console.log("connection problem");
                }
            }, this.reconnectionTimer);

        });

        this.ros.on('error', (e) => {
            console.log('Error connecting: ', e);
        })

        try {
            this.ros.connect(
                `ws://${this.rosbridgeServerIP}:${this.rosbridgeServerPort}`
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
