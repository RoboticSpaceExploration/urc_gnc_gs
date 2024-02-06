import React, { useState } from 'react';
import { Image, Toast, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import RoseLogo from "../Images/rose-logo.png";

function WaypointFeed({ type,position, visited, visible, index, id }) {
  const [show, setShow] = useState(true);

  function handleClose(){
    setShow(false);
    axios.delete(`http://localhost:9000/waypoints/${id}`).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
      //window.location.reload();
    });
  }

  return (
      <div className="queue-feed">
        <Toast show={show} onClose={handleClose} animation={false} style={{width: '100%'}}>
          <Toast.Header closeButton={true}>
            <strong className="me-auto">{index}</strong>
            <strong className="me-auto">Type: {type}</strong>
            <strong className="me-auto">Longitude: {position[0]}</strong>
            <strong className="me-auto">Latitude: {position[1]}</strong>
            <strong className="me-auto">Visited: {visited.toString()}</strong>
            <strong className="me-auto">Visible: {visible.toString()}</strong>
          </Toast.Header>
        </Toast>
      </div>
  );
};

export default WaypointFeed;
