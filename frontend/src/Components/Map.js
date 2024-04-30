import React, {useState, useEffect} from "react";
import { Form } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {render} from "@testing-library/react";
import {init_ros_connection} from "../ROSConnection";

// needed to properly display the default marker on the map
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('../Images/rover-data.png'),
//     iconUrl: require('../Images/rover-data.png'),
// });

function Map(props) {

    // dummy data for rover and waypoint location data
    const state = {
        location: [21.2998, -157.8148],
        testLocation: [[21.2992, -157.8148], [21.3000, -157.8155], [21.2995, -157.8159]],
        traceLine: [[21.2998, -157.8148], [21.2992, -157.8148], [21.3000, -157.8155], [21.2995, -157.8159]],
    }


    const [roverPosition, setRoverPosition] = useState([21.2984, -157.8168]);
    const [roverPath, setRoverPath] = useState([]);

    const listener = new window.ROSLIB.Topic({
        ros: init_ros_connection.ros,
        name: '/gps/fix',
        messageType: 'sensor_msgs/NavSatFix',
    })

    useEffect(() => {
        listener.subscribe(function (message) {
            const newPosition = [message.latitude, message.longitude];
            setRoverPosition(newPosition);
            setRoverPath(prevPath => [...prevPath, newPosition]);
            listener.unsubscribe();
            console.log(roverPath[roverPath.length - 1], newPosition);
            console.log(roverPath);
        })

    }, [roverPosition]);

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

    function FlyMapTo() {

        const map = useMap()

        useEffect(() => {
            map.panTo(roverPosition);
        }, [roverPosition])

        return null
    }

    return (
        <div>
            <Form>
                <Form.Control
                    type="number"
                    step="0.01"
                    name="longitude"
                    placeholder="enter longitude"
                    required
                />
                <Form.Control
                    type="number"
                    step="0.01"
                    name="longitude"
                    placeholder="enter latitude"
                    required
                />
            </Form>
            <MapContainer center={roverPosition} zoom={25} style={mapStyle}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RoverMarker position={roverPosition} icon={roverIcon} />
                <FlyMapTo />
                {/*<ObjMarker position={state.testLocation[2]} icon={objIcon} />*/}
                {props.waypointData && props.waypointData.map((waypoint, index) => {
                    return (
                        <ObjMarker position={waypoint.position} icon={objIcon} key={index}/>
                    );
                })}
                <Polyline positions={roverPath} color="red" />
            </MapContainer>
        </div>
    );
}

export default Map;
