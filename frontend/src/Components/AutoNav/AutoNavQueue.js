import React, { useEffect, useState } from "react";
import axios from "axios";
import QueueForm from "../Forms/QueueForm";
import { Button, Col, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
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
        axios({
        method: "GET",
        url: "http://localhost:9000/waypoints",
        })
        .then((response) => {
            const res = response.data;
            setWaypointData(res);
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
            url: "http://localhost:9000/autonav",
        })
        .then((response) => {
            const res = response.data;
            setQueueData(res);
        })
        .catch((error) => {
            if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        });
    }, [waypointData]);
  const setQueue = () => {
    if (queueData.length > 6) {
      //send the first 6 queue data to ros
      const newQueueData = queueData.slice(6);
      const queue = queueData.slice(0, 6);
      setQueueData(newQueueData);
      window.alert(`${queue.length} New locations was sent to ROS`);
      updateQueueBackend(newQueueData);
      // sendQueueRos(queue);
    } else {
      const newQueueData = []
      const queue = queueData.slice(0, queueData.length);
      window.alert(`${queue.length} New locations was sent to ROS`);
      setQueueData(newQueueData);
      updateQueueBackend(newQueueData);
      // sendQueueRos(queue);
    }
  };
  const updateQueueBackend = (e) => {
    axios
        .put("http://localhost:9000/autonav", e)
        .then((response) => {
          console.log(response.status);
          console.log(response.data.token);
          // window.location.reload();
        })
        .catch((error) => {
      console.error('Error updating backend:', error);
      // Handle the error appropriately (e.g., show a message to the user)
    });
    window.alert(`Backend received new list`);
  }
  // const sendQueueRos = (queue) => {
  //   cmd_autonav.name = topic_name;
  //   message = new window.ROSLIB.Message({data: `${queue}`});
  //   cmd_autonav.publish(message)
  // }
    return (
        <>
            <div>
                <h3 style={{ textAlign: "center" }}>Queue List</h3>
              <QueueForm/>
              <QueueDisplay queueData={queueData} />
              <Button variant={'success'} onClick={setQueue}>Submit Queue</Button>
            </div>
        </>
    )

}