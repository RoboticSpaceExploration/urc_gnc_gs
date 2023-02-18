import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import AutoNav from './Pages/AutoNav.js';
import Payload from './Pages/Payload.js';
import Arm from './Pages/Arm.js';
import Home from './Pages/Home.js';
import React from 'react';
import Speedometer from './Components/Speedometer';
import RoverDataOrientation from './Pages/RoverData/RoverDataOrientation';
import RoverDataGPS from './Pages/RoverData/RoverDataGPS';
import Controls from './Components/Controls';

function App() {
  return (
    <Router>
      <div className="main">
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
            <Route path="/roverdata/chassiscam" element={<RoverDataGPS/>} />
            <Route path="/roverdata/armcam" element={<RoverDataGPS/>} />
            <Route path="/roverdata/gps" element={<RoverDataGPS/>} />
            <Route path="/roverdata/orientation" element={<RoverDataOrientation/>} />
            <Route path="/roverdata/speedometer" element={<Speedometer/>} />
            <Route path="/roverdata/controls" element={<Controls />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
