import React from "react";
import { Container,Row,Col, Card } from 'react-bootstrap'
import SideNav from '../Components/SideNav';
import Connection from "../Components/Connection";
import Arm from "./Arm";
import Payload from "./Payload";
import AutoNav from "./AutoNav";
import System from "./System";

class Home extends React.Component {
    state = {};

    render() {
        return (
          <div id="home-page">
            
            <Row style={{padding:20}}>
              <Col lg={2} >
                <SideNav fixed="top"/>
              
              </Col>

              <Col lg={10} >
                <Container >
                  <h1 className = 'text-center mt-3'> Robot Control Page</h1>

                    <Connection />


               
                  <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                    <Card >
                      <Arm />
                    </Card>
                  </div>

                  <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                    <Card >
                      <Payload />
                    </Card>
                  </div>

                  <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                    <Card >
                      <AutoNav />
                    </Card>
                  </div>

                  <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                    <Card >
                       <System/>
                    </Card>
                  </div>

                  
                  
                  
                  
                </Container>
              
              
              </Col>

            </Row>
            
          
            
          </div>
        );
    }
}

export default Home;
