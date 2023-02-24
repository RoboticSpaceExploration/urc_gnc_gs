import React, { useEffect, useState, Component } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// needed to properly display the default marker on the map
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('../Images/rover-data.png'),
//     iconUrl: require('../Images/rover-data.png'),
// });


function RoverMarker(props) {

    return (
        <Marker position={props.position} icon={props.icon} />

    );
}

function ObjMarker(props) {

    return (
        <Marker position={props.position} icon={props.icon} />

    );
}

function Map() {


    const state = {
        location: {
            lat: 21.2998,
            lng: -157.8148,
        },
        testLocation: {
            lat: 21.2998,
            lng: -157.8159,
        },
        traceLine: [],
    }
    const mapStyle = {
        height: "300px",
        width: "100%"
    }
    const roverIcon = L.icon({
        iconUrl: require('../Images/rover-data.png'),
        iconSize: [40, 40],
        iconAnchor: [32, 64],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });
    const objIcon = L.icon({
        iconUrl: require('../Images/payload.png'),
        iconSize: [40, 40],
        iconAnchor: [32, 64],
        popupAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
    });

    return (
        <div>
            <MapContainer center={state.location} zoom={20} style={mapStyle}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <RoverMarker position={state.location} icon={roverIcon} />
                <ObjMarker position={state.testLocation} icon={objIcon} />
            </MapContainer>
        </div>
    );

}


export default Map;
