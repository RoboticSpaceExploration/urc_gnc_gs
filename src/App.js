import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import AutoNav from './Pages/AutoNav.js';
import Payload from './Pages/Payload.js';
import Arm from './Pages/Arm.js';
import Home from './Pages/Home.js';
import React from 'react';
import GPSCoordinates from './Components/GPSCoordinates';
import Speedometer from './Components/Speedometer';
import Compass from './Components/Compass';
import SideNav from "./Components/SideNav";

function App() {
  return (
    <Router>
      <div className="main">
          <SideNav/>
        <Routes>
            <Route path="/autonav" element={<AutoNav/>} />
            <Route path="/payload" element={<Payload/>} />
            <Route path="/arm" element={<Arm/>} />
            <Route path="/" element={<Home/>} />
          {/*// Todo: change path for both cameras*/}
            <Route path="/roverdata/chassiscam" element={<GPSCoordinates/>} />
            <Route path="/roverdata/armcam" element={<GPSCoordinates/>} />
            <Route path="/roverdata/gps" element={<GPSCoordinates/>} />
            <Route path="/roverdata/orientation" element={<Compass/>} />
            <Route path="/roverdata/speedometer" element={<Speedometer/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
