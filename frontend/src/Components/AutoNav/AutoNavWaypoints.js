import React, { useEffect, useState } from "react";
import axios from "axios";
import WaypointForm from "../Forms/WaypointForm";
import WaypointDisplay from '../WaypointDisplay';

export const AutoNavWaypoints = ()=>{
    const [waypointData, setWaypointData] = useState(null);

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
    }, [waypointData]);

    console.log(waypointData);
    return(

        <>
            <div>
                <h3 style={{ textAlign: "center" }}>Insert Waypoint</h3>
              <WaypointForm/>
              <WaypointDisplay waypointData={waypointData} />
            </div>
        
        </>
    )

}