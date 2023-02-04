const Config = {
    ROSBRIDGE_SERVER_IP: "192.168.0.223",

    ROSBRIDGE_SERVER_PORT: "9090",
    RECONNECTION_TIMER: 3000,
    CMD_VEL_TOPIC: "/turtle1/cmd_vel",
    // CMD_CAM_TOPIC: "/d435i/color/image_raw/compressed",
    CMD_CAM_TOPIC: "/camera/color/image_raw"
};

export default Config;