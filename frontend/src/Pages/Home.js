import React, { useEffect, useState } from "react";
import { Container,Row,Col, Card,But } from 'react-bootstrap'
import SideNav from '../Components/SideNav';
import Connection from "../Components/Connection";
import Arm from "./Arm";
import Payload from "./Payload";
import AutoNav from "./AutoNav";
import System from "./System";

const  Home = ()=>{

        

          useEffect(()=>{

            document.getElementById('navbar-autonav').onclick = ()=>{
              changeWindowArray([...windowArray, 
              <div style={{ paddingTop: '20px', paddingBottom: '20px',width:'50%',padding:10}}>
              <Card>
              
                
                <AutoNav/>
              </Card>
            
              </div>
            ])
            }

            document.getElementById('navbar-payload').onclick = ()=>{
              changeWindowArray([...windowArray, <div style={{ paddingTop: '20px', paddingBottom: '20px',width:'50%',padding:10}}>
              <Card>
                <Payload/>
              </Card>
            </div>])
            }

            document.getElementById('navbar-arm').onclick = ()=>{
              changeWindowArray([...windowArray, <div style={{ paddingTop: '20px', paddingBottom: '20px',width:'50%',padding:10}}>
              <Card>
                <Arm/>
              </Card>
            </div>])
            }

            document.getElementById('navbar-system').onclick = ()=>{
              changeWindowArray([...windowArray, <div style={{ paddingTop: '20px', paddingBottom: '20px',width:'50%',padding:10}}>
              <Card>
                <System/>
              </Card>
            </div>])
            }


          })

          const [windowArray,changeWindowArray] = useState([])


         


          

          return(
          <div id="home-page">
            
            <Row style={{padding:20}}>
              <Col lg={2} >
                <SideNav />
               
              </Col>

              <Col lg={10} >
             

                  
                <h1 className = 'text-center mt-3'> Robot Control Page</h1>

                <Connection />

                <Container className=" d-flex justify-content-center flex-row flex-wrap ">
               

                   {/* <div style={{ paddingTop: '20px', paddingBottom: '20px',width:'50%',padding:10}}>

                    <Card>
                      <Arm/>
                    </Card>
                  </div>

                  <div style={{ paddingTop: '20px', paddingBottom: '20px',width:'50%',padding:10}}>

                    <Card>
                      <Arm/>
                    </Card>
                  </div>  */}

                  
                 
                 {windowArray}

                 

                  
                  

                </Container>

              </Col>

            </Row>
            
          
            
          </div>
          )
        
    
}

export default Home;
