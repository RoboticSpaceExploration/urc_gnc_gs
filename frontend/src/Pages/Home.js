import React from "react";
import { Container } from 'react-bootstrap'
import SideNav from '../Components/SideNav';

class Home extends React.Component {
    state = {};

    render() {
        return (
          <div id="home-page">
            <SideNav />
            <Container style={{marginTop: "-350px"}}>
                <h1 className = 'text-center mt-3'> Robot Control Page</h1>
            </Container>
          </div>
        );
    }
}

export default Home;
