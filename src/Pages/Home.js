import React, {Component} from "react";
import Connection from "../Components/Connection";
import Teleoperation from "../Components/Teleoperation";
import SideNav from '../Components/SideNav';

class Home extends Component {
    state = {};

    render() {
        return (
            <main>
              <SideNav/>
                <h1 className = 'text-center mt-3'> Robot Control Page</h1>

                {/* <Connection /> */}
                {/* <Teleoperation/> */}
            </main>
        );
    }
}

export default Home;
