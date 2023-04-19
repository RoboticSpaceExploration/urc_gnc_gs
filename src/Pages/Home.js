import React, {Component} from "react";
import SideNav from '../Components/SideNav';
import { Container } from 'react-bootstrap'

class Home extends Component {
    state = {};

    render() {
        return (
          <div id="home-page">
            <SideNav />
            <Container style={{marginTop: "-80px"}}>
                <h1 className = 'text-center mt-3'> Robot Control Page</h1>
            </Container>
          </div>
        );
    }
}

export default Home;
