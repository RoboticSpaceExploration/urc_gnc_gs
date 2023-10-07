import React from "react";
import { Container,Row,Col } from 'react-bootstrap'
import SideNav from '../Components/SideNav';

import Arm from "./Arm";

class Home extends React.Component {
    state = {};

    render() {
        return (
          <div id="home-page">
            
            <Row>
              <Col lg={2}>
              <SideNav/>
              
              </Col>

              <Col lg={10}>
              <Container >
                <h1 className = 'text-center mt-3'> Robot Control Page</h1>
                
              </Container>
              
              
              </Col>

            </Row>
            
          
            
          </div>
        );
    }
}

export default Home;
