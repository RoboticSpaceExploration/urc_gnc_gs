import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { render } from "@testing-library/react";
import { Button } from "react-bootstrap";

// needed to properly display the default marker on the map
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('../Images/rover-data.png'),
//     iconUrl: require('../Images/rover-data.png'),
// });

function Map(props) {


    const state = {
        location: {
            lat: 21.2998,
            lng: -157.8148,
        },
        testLocation: {
            lat: 21.3000,
            lng: -157.8159,
        },
        traceLine: [[21.2998, -157.8148], [21.2998, -157.8155], [21.2998, -157.8159]],
    }
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
        iconUrl: require('../Images/payload.png'),
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    const [roverLocation, setRoverLocation] = useState(state.location);
    const [lineLocation, setLineLocation] = useState(state.traceLine);
    // update locations
    const updateLocation = (newLocation) => {
        setRoverLocation(newLocation);
    }


    function RoverMarker(props) {

        // updateLocation([21.2998, -157.8159]);

        return (
            <Marker position={props.position} icon={props.icon} />

        );
    }

    function ObjMarker(props) {

        return (
            <Marker position={props.position} icon={props.icon} />

        );
    }


    return (
        <div>
            <MapContainer center={state.location} zoom={20} style={mapStyle}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <RoverMarker position={roverLocation} icon={roverIcon} />
                <ObjMarker position={state.testLocation} icon={objIcon} />
                <Polyline positions={lineLocation} color="red" />
            </MapContainer>
            <Button onClick={() => updateLocation([21.2998, -157.8159])
            }>Update Location</Button>
        </div>
    );
}

export default Map;
