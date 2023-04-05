import React, {useState} from "react";
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function WaypointForm() {
    const [ waypoint, setWaypoint ] = useState({
        type: "AR Tag",
        position: [],
        visited: false,
        visible: false,
    });
    const [queueValidated, setValidated] = useState(false);


    const handleChange = (e) => {
        const value = e.target.value;
        setWaypoint({
            ...waypoint,
            [e.target.name]: value,
        });
        console.log(waypoint);
    };

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        // if (form.checkValidity() === false) {
        //     e.stopPropagation();
        // }
        // setValidated(true);
        const newWaypoint = {
            type: waypoint.type,
            position: [Number(waypoint.latitude), Number(waypoint.longitude)],
            visited: waypoint.visited,
            visible: waypoint.visible,
        };
        if (!newWaypoint) {
            console.log("xd");
        } else {
            axios
                .post("http://localhost:9000/waypoints", newWaypoint)
                .then((response) => {
                    console.log(response.status);
                    console.log(response.data.token);
                    window.location.reload();
                });
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Select aria-label="Default select example">
                    <option value="1">AR Tag</option>
                    <option value="2">Goal</option>
                </Form.Select>
                <Form.Control
                    type="number"
                    step="0.0001"
                    name="latitude"
                    placeholder="enter latitude"
                    onChange={handleChange}
                    required
                />
                <Form.Control
                    type="number"
                    step="0.0001"
                    name="longitude"
                    placeholder="enter longitude"
                    onChange={handleChange}
                    required
                />
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default WaypointForm;
