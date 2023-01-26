import React, { useState } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Toast from 'react-bootstrap/Toast';
import RoseLogo from "../Images/rose-logo.png";

const QueueFeed = (props) => {
    const [show, setShow] = useState(true);

    function handleClose(){
        setShow(false);
        console.log("this is queue being deleted: " +   props.queue);
        console.log(`http://localhost:9000/autonav/${props.queue}`);
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
                <Image
                    src={RoseLogo}
                    className="queue-img"
                    alt=""
                />
                <strong className="me-auto">Insert Title</strong>
                <small className="text-muted">{props.queue}</small>
            </Toast.Header>
            <Toast.Body>Latitude: {props.latitude} Longitude: {props.longitude}</Toast.Body>
        </Toast>
    </div>
  );
};

export default QueueFeed;
