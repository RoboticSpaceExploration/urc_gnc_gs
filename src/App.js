import RoseLogo from './rose-logo.png';
import './App.css';
import { HashRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import SideNav from './Components/SideNav.js';
import AutoNav from './Pages/AutoNav.js';
import RoverData from './Pages/RoverData.js';
import Payload from './Pages/Payload.js';
import Arm from './Pages/Arm.js';

function App() {
  return (
    <Router>
      <SideNav name='Tester'/>
      <div className="main">
        <Routes>
            <Route path="/autonav" element={<AutoNav/>} />
	    <Route path="/roverdata" element={<RoverData/>} />
	    <Route path="/payload" element={<Payload/>} />
	    <Route path="/arm" element={<Arm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
