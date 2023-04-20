import React, { useState } from 'react';
import { Image, Toast } from 'react-bootstrap';
import axios from 'axios';
import RoseLogo from "../Images/rose-logo.png";

function QueueFeed(props) {
    const [show, setShow] = useState(true);

    function handleClose(){
        setShow(false);
        axios.delete(`http://localhost:9000/autonav/${props.queue}`).then((response) => {
            console.log(response.status);
            console.log(response.data.token);
            window.location.reload();
        });
    }

  return (
    <div className="queue-feed">
        <Toast show={show} onClose={handleClose} animation={false}>
            <Toast.Header closeButton={true}>
                {/*<Image*/}
                {/*    src={RoseLogo}*/}
                {/*    className="queue-img"*/}
                {/*    alt=""*/}
                {/*    size="10px"*/}
                {/*/>*/}
                <strong className="me-auto">Insert Title</strong>
                <small className="text-muted">{props.queue}</small>
            </Toast.Header>
            <Toast.Body>Latitude: {props.latitude} Longitude: {props.longitude}</Toast.Body>
        </Toast>
    </div>
  );
};

export default QueueFeed;
