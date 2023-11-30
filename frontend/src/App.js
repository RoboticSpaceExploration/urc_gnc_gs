import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AutoNav from './Pages/AutoNav.js';
import Payload from './Pages/Payload.js';
import Arm from './Pages/Arm.js';
import Home from './Pages/Home.js';
import System from './Pages/System.js';
import NewHome from './Pages/NewHome.js';
import RoverDataChassisCam from './Pages/RoverData/RoverDataChassisCam';
import RoverDataArmCam from './Pages/RoverData/RoverDataArmCam';
import RoverDataGPS from './Pages/RoverData/RoverDataGPS';
import RoverDataOrientation from './Pages/RoverData/RoverDataOrientation';
import RoverDataSpeed from './Pages/RoverData/RoverDataSpeed';
import RoverDataControl from './Pages/RoverData/RoverDataControl';
import ArmControls from "./Pages/Arm/ArmControls";
import { AutoNavQueue } from './Components/AutoNav/AutoNavQueue';
import { AutoNavMap } from './Components/AutoNav/AutoNavMap';
import { AutoNavWaypoints } from './Components/AutoNav/AutoNavWaypoints';



function App() {

  return (
    <Router>

      <div>
          <Routes>
            <Route path="/autonavwaypoints" element={<AutoNavWaypoints/>} />
            <Route path="/autonavmap" element={<AutoNavMap/>} />
            <Route path="/autonavqueue" element={<AutoNavQueue/>} />
            <Route path="/autonav" element={<AutoNav />} />
            <Route path="/payload" element={<Payload />} />
            <Route path="/arm" element={<Arm />} />
            <Route path="/" element={<Home />} />
            <Route path="/autonav" element={<AutoNav/>} />
            <Route path="/payload" element={<Payload/>} />
            <Route path="/arm" element={<Arm/>} />
            <Route path="/system" element={<System/>} />
            <Route path="/" element={<Home/>} />
            <Route path="/newhome" element={<NewHome />} />
          </Routes>
        </div>
        <div>
          <Routes>
            <Route path="/speedometer" element={<RoverDataSpeed />} />
            <Route path="/teleopcontrols" element={<RoverDataControl />} />
            <Route path="/location" element={<RoverDataGPS />} />
            <Route path="/roverdata/chassiscam" element={<RoverDataChassisCam />} />
            <Route path="/roverdata/armcam" element={<RoverDataArmCam />} />
            <Route path="/roverdata/gps" element={<RoverDataGPS />} />
            <Route path="/roverdata/orientation" element={<RoverDataOrientation />} />
            <Route path="/roverdata/speedometer" element={<RoverDataSpeed />} />
            <Route path="/roverdata/controls" element={<RoverDataControl />} />
            <Route path="/arm/controls" element={<ArmControls />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
