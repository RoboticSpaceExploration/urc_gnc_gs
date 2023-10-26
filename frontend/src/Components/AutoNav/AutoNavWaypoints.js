import React, { useEffect, useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import axios from "axios";

import WaypointForm from "../Forms/WaypointForm";





export const AutoNavWaypoints = ()=>{
    const [waypointData, setWaypointData] = useState(null);
    const [queueData, setQueueData] = useState(null);

    const cardStyle = { height: "100vh" };
    const titleStyle = { textAlign: "center", marginBottom: "10px" };

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
    }, []);


    return(



        <>
        
            <div>
                <h3 style={{ textAlign: "center" }}>Insert Waypoint</h3>
              <WaypointForm/>
            
            </div>
        
        </>
    )

}