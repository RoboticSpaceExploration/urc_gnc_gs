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

    const autoNav = new window.ROSLIB.Topic({
        ros: init_ros_connection.ros,
        name: "/waypoint_list",
        messageType: "/geographic_msgs/GeoPointStamped",
    });

  let message = {};
  const topic_name = "autonav";
    useEffect(() => {
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
    }, [queueData]);

    function sendQueueRos(queue) {
        //maps the queue data to ros messages
        let navQueue = queue.map((q) => {
            message = new window.ROSLIB.Message({
                longitude: q.longitude,
                latitude: q.latitude,
            });
            return message;
        });
        console.log(navQueue);

        //publishes the navigation queue to waypoints ros topic
        autoNav.publish(navQueue);

    }

  const setQueue = () => {
    let newQueueData = [];
    let queue = [];
    if (queueData.length > 6) {
      //separate the first 6 set of coordinates in queueData
      newQueueData = queueData.slice(6);
      queue = queueData.slice(0,6);

      //update this components queueData
      setQueueData(newQueueData);

      window.alert(`${queue.length} New locations was sent to ROS`);

      //update the backend
      updateQueueBackend(newQueueData);

      //send first 6 set of coordinates to rover through ROS
      sendQueueRos(queue);
    } else {
      queue = queueData.slice(0, queueData.length);
      window.alert(`${queue.length} New locations was sent to ROS`);

      //update each queueData to be the empty list
      setQueueData([]);
      updateQueueBackend([]);

      //send list of coordinates to rover through ROS
      sendQueueRos(queue);
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
    // window.alert(`Backend received new list`);
  }

    return (
            <div>
              <h3 style={{ textAlign: "center" }}>Queue List</h3>
              <QueueForm/>
              <QueueDisplay queueData={queueData} />
              <Button variant={'success'} onClick={setQueue}>Submit Queue</Button>
            </div>
    )

}
