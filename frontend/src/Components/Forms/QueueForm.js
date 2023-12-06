import React, { useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function QueueForm() {
    const [newCoord, setCoord] = useState({
        latitude: null,
        longitude: null,
    });
    const [newQueue, setQueue] = useState([]);
    const [queueValidated, setValidated] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setCoord({
            ...newCoord,
            [e.target.name]: value,
        });
    };

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        const coordData = {
            longitude: Number(newCoord.longitude),
            latitude: Number(newCoord.latitude),
        };
        try {
          const response = await fetch('/autonav', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCoord),
            });

          const data = await response.json();
          console.log(data);
          setCoord({
            longitude: null,
            latitude: null,
          });
          } catch (error) {
            console.error('Error submitting form:', error);
        }

        if (!coordData.longitude || !coordData.latitude) {
            console.log("xd");
        } else {
            axios
                .post("http://localhost:9000/autonav", coordData)
                .then((response) => {
                    console.log(response.status);
                    console.log(response.data.token);
                    // window.location.reload();
                });
        }
    };


    return (
        <div>
            <Form noValidate validated={queueValidated} onSubmit={handleSubmit}>
                <Form.Control
                    type="number"
                    step="0.01"
                    name="latitude"
                    placeholder="enter latitude"
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please give valid input.
                </Form.Control.Feedback>
                <Form.Control
                    type="number"
                    step="0.01"
                    name="longitude"
                    placeholder="enter longitude"
                    onChange={handleChange}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please give valid input.
                </Form.Control.Feedback>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default QueueForm;
