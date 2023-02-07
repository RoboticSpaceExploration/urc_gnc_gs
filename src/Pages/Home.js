import React, {Component} from "react";
import Connection from "../Components/Connection";
import Teleoperation from "../Components/Teleoperation";

class Home extends Component {
    state = {};

    render() {
        return (
            <main>
                <h1 className = 'text-center mt-3'> Robot Control Page</h1>

                {/* <Connection /> */}
                {/* <Teleoperation/> */}
            </main>
        );
    }
}

export default Home;