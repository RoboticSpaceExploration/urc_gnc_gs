import React, {useEffect, useState} from "react";
import {MapContainer, Marker, Polyline, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {init_ros_connection} from "../ROSConnection";

// needed to properly display the default marker on the map
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('../Images/rover-data.png'),
//     iconUrl: require('../Images/rover-data.png'),
// });

function Map(props) {

    /* dummy data for rover and waypoint location data
    const state = {
        location: [21.2998, -157.8148],
        testLocation: [[21.2992, -157.8148], [21.3000, -157.8155], [21.2995, -157.8159]],
        traceLine: [[21.2998, -157.8148],[21.2992, -157.8148], [21.3000, -157.8155], [21.2995, -157.8159]],
    }
    */

    const [latitude, setLatitude] = useState(21.2998);
    const [longitude, setLongitude] = useState(-157.8148);
    const [location, setLocation] = useState([latitude, longitude]);

    const listener = new window.ROSLIB.Topic({
        ros: init_ros_connection.ros,
        name: '/gps/fix',
        messageType: 'sensor_msgs/NavSatFix',
    })

    useEffect(() => {
        listener.subscribe(function (message) {
            setLatitude(message.latitude);
            setLongitude(message.longitude);
            setLocation([message.latitude, message.longitude]);
            listener.unsubscribe();
        })
    }, [location])

    const mapStyle = {
        height: "60vh",
        width: "100%"
    }

    const roverIcon = L.icon({
        iconUrl: require('../Images/rover-data.png'),
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });
    const objIcon = L.icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        iconSize: [20, 30],
        iconAnchor: [10, 30],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    const [objLocation, setObjLocation] = useState([]);
    const [lineLocation, setLineLocation] = useState([location]); //traces the motion of the rover

    // allow users to submit waypoints data
    const updateObjLocation = (newLocation) => {
        setObjLocation([...objLocation, newLocation]);
    }


    function RoverMarker(props) {

        // updateLocation([21.2998, -157.8159]);

        return (
            <Marker position={props.position} icon={props.icon}/>

        );
    }

    function ObjMarker(props) {

        return (
            <Marker position={props.position} icon={props.icon}/>

        );
    }


    return (
        <div>
            <MapContainer center={location} zoom={25} style={mapStyle}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <RoverMarker position={location} icon={roverIcon}/>
                {/*<ObjMarker position={state.testLocation[2]} icon={objIcon} />*/}
                {props.waypointData && props.waypointData.map((waypoint, index) => {
                    return (
                        <ObjMarker position={waypoint.position} icon={objIcon} key={index}/>
                    );
                })}
                if (location !== [0, 0]) {
                <Polyline positions={lineLocation} color="red"/>
                }
            </MapContainer>
        </div>
    );
}

export default Map;
