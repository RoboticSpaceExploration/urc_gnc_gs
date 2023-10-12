import React from "react";
import { Container,Row,Col, Card } from 'react-bootstrap'
import SideNav from '../Components/SideNav';
import Connection from "../Components/Connection";
import Arm from "./Arm";
import Payload from "./Payload";
import AutoNav from "./AutoNav";
import System from "./System";

class Home extends React.Component {
    

    render() {


      const windowArray = [1,2,3,4]


      // const populateTiles = windowArray.map((tile,key) =>

       
      // )


        return (

          <div id="home-page">
            
            <Row style={{padding:20}}>
              <Col lg={2} >
                <SideNav fixed="top"/>
              
              </Col>

              <Col lg={10} >
             

                  
                <h1 className = 'text-center mt-3'> Robot Control Page</h1>

                <Connection />

                <Container className=" d-flex justify-content-center flex-row flex-wrap ">
                  {/* {populateTiles} */}
                  
                  

                </Container>

              </Col>

            </Row>
            
          
            
          </div>
        );
    }
}

export default Home;
