import React, { useEffect, useState } from "react";
import axios from "axios";
import QueueForm from "../Forms/QueueForm";
import { Button, Col, Row } from 'react-bootstrap';
import QueueDisplay from '../QueueDisplay';
import { init_ros_connection } from '../../ROSConnection';


export const AutoNavQueue = ()=>{
    const [waypointData, setWaypointData] = useState(null);
    const [queueData, setQueueData] = useState(null);
  const tempData = [
    { longitude: 12.3456, latitude: 34.5678 },
    { longitude: -56.789, latitude: 78.9012 },
    { longitude: 12.3456, latitude: 34.5678 },
    { longitude: -56.789, latitude: 78.9012 },
    { longitude: 12.3456, latitude: 34.5678 },
    { longitude: -56.789, latitude: 78.9012 },
    { longitude: 12.3456, latitude: 34.5678 },
    { longitude: -56.789, latitude: 78.9012 },
  ];
    // const cardStyle = { height: "100vh" };
    // const titleStyle = { textAlign: "center", marginBottom: "10px" };

  const cmd_autonav = new window.ROSLIB.Topic({
    ros: init_ros_connection.ros,
    messageType: "std_msgs/Float64",
  });

  let message = {};
  const topic_name = "autonav";
  useEffect(() => {
    // Use useEffect to initialize or update queueData
    setQueueData(tempData);
  }, []);
    // useEffect(() => {
    //     axios({
    //     method: "GET",
    //     url: "http://localhost:9000/waypoints",
    //     })
    //     .then((response) => {
    //         const res = response.data;
    //         setWaypointData(res);
    //     })
    //     .catch((error) => {
    //         if (error.response) {
    //         console.log(error.response);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //         }
    //     });
    //     axios({
    //         method: "GET",
    //         url: "http://localhost:9000/autonav",
    //     })
    //     .then((response) => {
    //         const res = response.data;
    //         setQueueData(res);
    //     })
    //     .catch((error) => {
    //         if (error.response) {
    //         console.log(error.response);
    //         console.log(error.response.status);
    //         console.log(error.response.headers);
    //         }
    //     });
    // }, []);
  const sendQueue = () => {
    if (queueData.length > 6) {
      //send the first 6 queue data to ros
      const newQueueData = queueData.slice(6);
      // const queue = queueData.slice(0, 6);
      // cmd_autonav.name = topic_name;
      // message = new window.ROSLIB.Message({data: `${queue}`});
      // cmd_autonav.publish(message);
      setQueueData(newQueueData);
    } else {
      //send all queue data
      // const queue = queueData;
      // cmd_autonav.name = topic_name;
      // message = new window.ROSLIB.Message({data: `${queue}`});
      // cmd_autonav.publish(message);
      setQueueData([]);
    }
  };
    return (
        <>
            <div>
                <h3 style={{ textAlign: "center" }}>Queue List</h3>
              <Row className="d-flex justify-content-center align-items-center">
                <Col className="text-center">
                  Longitude
                </Col>
                <Col className="text-center">
                  Latitude
                </Col>
              </Row>

              <QueueDisplay queueData={queueData} />
              <QueueForm/>
              <Button variant={'success'} onClick={sendQueue}>Submit Queue</Button>
            </div>
        </>
    )

}