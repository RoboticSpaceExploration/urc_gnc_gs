import React, { useEffect, useState } from "react";
import { Container,Row,Col, Card,Button, NavItem,Nav } from 'react-bootstrap'
import SideNav from '../Components/SideNav';
import Connection from "../Components/Connection";
import Arm from "./Arm";
import Payload from "./Payload";
import AutoNav from "./AutoNav";
import System from "./System";

const  Home = ()=>{

        

          useEffect(()=>{

            document.getElementById('navbar-autonav').onclick = ()=>{

              if(windowActive.autonav==false){
                changeWindowArray([...windowArray, 
                  <div style={{ paddingTop: '20px', paddingBottom: '20px',width:'48%',}}>
                    <Card>
                    
                        {/* <i onclick={window.alert("hey")} id='close-autonav' className="fa-solid fa-x" style={{padding:10,}} /> */}
                        
                
                      <AutoNav/>
                    </Card>
                
                  </div>
                ])
                changeWindowActive({...windowActive,autonav:true})
              }
            }

            document.getElementById('navbar-payload').onclick = ()=>{
              if(windowActive.payload==false){
                changeWindowArray([...windowArray, 
                  <div style={{ paddingTop: '20px', paddingBottom: '20px',width:'48%',}}>
                    <Card>
                    
                        {/* <i onclick={window.alert("hey")} id='close-autonav' className="fa-solid fa-x" style={{padding:10,}} /> */}
                        
                
                      <Payload/>
                    </Card>
                
                  </div>
                ])
                changeWindowActive({...windowActive,payload:true})
              }
            }

            document.getElementById('navbar-arm').onclick = ()=>{
              if(windowActive.arm==false){
                changeWindowArray([...windowArray, 
                  <div style={{ paddingTop: '20px', paddingBottom: '20px',width:'48%',}}>
                    <Card>
                    
                        {/* <i onclick={window.alert("hey")} id='close-autonav' className="fa-solid fa-x" style={{padding:10,}} /> */}
                        
                
                      <Arm/>
                    </Card>
                
                  </div>
                ])
                changeWindowActive({...windowActive,arm:true})
              }
            }

            document.getElementById('navbar-system').onclick = ()=>{
              if(windowActive.system==false){
                changeWindowArray([...windowArray, 
                  <div style={{ paddingTop: '20px', paddingBottom: '20px',width:'48%',}}>
                    <Card>
                    
                        {/* <i onclick={window.alert("hey")} id='close-autonav' className="fa-solid fa-x" style={{padding:10,}} /> */}
                        
                
                      <System/>
                    </Card>
                
                  </div>
                ])
                changeWindowActive({...windowActive,system:true})
              }
            }


          })

          const [windowArray,changeWindowArray] = useState([])
          const [windowActive,changeWindowActive] = useState({

            autonav:false,
            payload:false,
            arm:false,
            system:false,

          })
          


         


          

          return(
          <div id="home-page">
            
            <Row style={{padding:20}}>
              <Col lg={2} >
                <SideNav />
               
              </Col>

              <Col lg={10} >
             

                  
                <h1 className = 'text-center mt-3'> Robot Control Page</h1>

                <Connection />

                <div className=" d-flex  flex-row flex-wrap justify-content-between">
               

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

                 

                  
                  

                </div>

              </Col>

            </Row>
            
          
            
          </div>
          )
        
    
}

export default Home;
