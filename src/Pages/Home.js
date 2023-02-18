import React, {Component} from "react";
import SideNav from '../Components/SideNav';

class Home extends Component {
    state = {};

    render() {
        return (
            <main>
              <SideNav/>
                <h1 className = 'text-center mt-3'> Robot Control Page</h1>
            </main>
        );
    }
}

export default Home;
