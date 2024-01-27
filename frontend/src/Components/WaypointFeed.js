import React, { useState } from 'react';
import { Image, Toast, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import RoseLogo from "../Images/rose-logo.png";

function WaypointFeed(props) {
  const [show, setShow] = useState(true);

  function handleClose(){
    setShow(false);
    axios.delete(`http://localhost:9000/waypoints/${props.id}`).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
      window.location.reload();
    });
  }

  return (
      <div className="queue-feed">
        <Toast show={show} onClose={handleClose} animation={false} style={{width: '100%'}}>
          <Toast.Header closeButton={true}>
            <strong className="me-auto">{props.id}</strong>
            <strong className="me-auto">Type: {props.type}</strong>
            <strong className="me-auto">Longitude: {props.position[0]}</strong>
            <strong className="me-auto">Latitude: {props.position[1]}</strong>
            <strong className="me-auto">Visited: {props.visited.toString()}</strong>
            <strong className="me-auto">Visible: {props.visible.toString()}</strong>
          </Toast.Header>
        </Toast>
      </div>
  );
};

export default WaypointFeed;
