import React, { useEffect, useState } from "react";
import axios from "axios";

import QueueFeed from "../QueueFeed";
import QueueForm from "../Forms/QueueForm";


export const Queue = ()=>{
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

    return (

        


        <>
        <div>
            <h3 style={{ textAlign: "center" }}>Queue List</h3>
                {queueData &&
                    queueData.map((queue) => {
                    return (
                        <QueueFeed
                        queue={queue.queue}
                        latitude={queue.latitude}
                        longitude={queue.longitude}
                        key={queue.queue}
                        />
                    );
                    })}
                <QueueForm/>
            </div>
        </>
    )


}