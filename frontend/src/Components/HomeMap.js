import React, { useState, useCallback } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { render } from "@testing-library/react";

// needed to properly display the default marker on the map
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('../Images/rover-data.png'),
//     iconUrl: require('../Images/rover-data.png'),
// });

function HomeMap(props) {

  // dummy data for rover and waypoint location data
  const state = {
    location: [21.2998, -157.8148],
    testLocation: [[21.2992, -157.8148], [21.3000, -157.8155], [21.2995, -157.8159]],
    traceLine: [[21.2998, -157.8148],[21.2992, -157.8148], [21.3000, -157.8155], [21.2995, -157.8159]],
  }

  const mapStyle = {
    height: "45vh",
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

  const [roverLocation, setRoverLocation] = useState(state.location); //the current location of the rover
  const [lineLocation, setLineLocation] = useState([state.location]); //traces the motion of the rover

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


  return (
      <div>
        <MapContainer center={state.location} zoom={25} style={mapStyle}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <RoverMarker position={roverLocation} icon={roverIcon} />
          {/*<ObjMarker position={state.testLocation[2]} icon={objIcon} />*/}
          {props.waypointData && props.waypointData.map((waypoint, index) => {
            return (
                <ObjMarker position={waypoint.position} icon={objIcon} key={index} />
            );
          })}
          <Polyline positions={lineLocation} color="red" />
        </MapContainer>
      </div>
  );
}

export default HomeMap;
