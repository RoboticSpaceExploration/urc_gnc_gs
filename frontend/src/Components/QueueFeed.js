import React, { useState } from 'react';
import { Image, Toast, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import RoseLogo from "../Images/rose-logo.png";

function QueueFeed({queue, longitude, latitude, index, key}) {
    const [show, setShow] = useState(true);

    function handleClose(){

        setShow(false);
        axios.delete(`http://localhost:9000/autonav/${queue}`).then((response) => {
            console.log(response.status);
            //window.location.reload();
        });
    }

    return (
        <div className="queue-feed">
            <Toast show={show} onClose={handleClose} animation={false} style={{width: '100%'}}>
                <Toast.Header closeButton={true}>
                    <strong className="me-auto">{index}</strong>
                    <strong className="me-auto">Latitude: {latitude}</strong>
                    <strong className="me-auto">Longitude: {longitude}</strong>
                </Toast.Header>
            </Toast>
        </div>
    );
};

export default QueueFeed;
