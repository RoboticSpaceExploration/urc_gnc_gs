import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import AutoNav from './Pages/AutoNav.js';
import Payload from './Pages/Payload.js';
import Arm from './Pages/Arm.js';
import Home from './Pages/Home.js';
import GPSCoordinates from './Components/GPSCoordinates';
import Speedometer from './Components/Speedometer';
import Compass from './Components/Compass';
import Controls from './Components/Controls';
import RoverDataOrientation from './Pages/RoverData/RoverDataOrientation';
import RoverDataGPS from './Pages/RoverData/RoverDataGPS';
import RoverDataChassisCam from './Pages/RoverData/RoverDataChassisCam';
import RoverDataArmCam from './Pages/RoverData/RoverDataArmCam';
import RoverDataSpeed from './Pages/RoverData/RoverDataSpeed';
import RoverDataControl from './Pages/RoverData/RoverDataControl';

function App() {

  return (
    <Router>

      <div>
          <Routes>
            <Route path="/autonav" element={<AutoNav/>} />
            <Route path="/payload" element={<Payload/>} />
            <Route path="/arm" element={<Arm/>} />
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
        <div>
          <Routes>
            {/*// Todo: change path for both cameras*/}
            <Route path="/roverdata/chassiscam" element={<RoverDataChassisCam/>} />
            <Route path="/roverdata/armcam" element={<RoverDataArmCam/>} />
            <Route path="/roverdata/gps" element={<RoverDataGPS/>} />
            <Route path="/roverdata/orientation" element={<RoverDataOrientation/>} />
            <Route path="/roverdata/speedometer" element={<RoverDataSpeed/>} />
            <Route path="/roverdata/controls" element={<RoverDataControl/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
