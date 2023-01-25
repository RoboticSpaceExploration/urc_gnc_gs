import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import SideNav from './Components/SideNav.js';
import AutoNav from './Pages/AutoNav.js';
import RoverData from './Pages/RoverData.js';
import Payload from './Pages/Payload.js';
import Arm from './Pages/Arm.js';
import Home from './Pages/Home.js';

function App() {
  return (
    <Router>
      <SideNav/>
      <div className="main">
        <Routes>
            <Route path="/autonav" element={<AutoNav/>} />
	          <Route path="/roverdata" element={<RoverData/>} />
	          <Route path="/payload" element={<Payload/>} />
	          <Route path="/arm" element={<Arm/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
