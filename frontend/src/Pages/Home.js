import React, { useEffect, useState } from "react";
import { Container,Row,Col, Card,Button, NavItem,Nav } from 'react-bootstrap'
import SideNav from '../Components/SideNav';
import Connection from "../Components/Connection";
import Arm from "./Arm";
import Payload from "./Payload";
import AutoNav from "./AutoNav";
import System from "./System";

const Home = ()=>{

        useEffect(()=>{

          document.getElementById('navbar-autonav').onclick = ()=>{

            if(windowActive.autonav===false){
              changeWindowArray([...windowArray,'autonav'])
              changeWindowActive({...windowActive,autonav:true})
            }
            else{
              document.getElementById("window-autonav").scrollIntoView()
            }
          }

          document.getElementById('navbar-payload').onclick = ()=>{
            if(windowActive.payload===false){
              changeWindowArray([...windowArray,'payload'])
              changeWindowActive({...windowActive,payload:true})
            }
            else{
              document.getElementById("window-payload").scrollIntoView()
            }
          }

          document.getElementById('navbar-arm').onclick = ()=>{
            if(windowActive.arm===false){
              changeWindowArray([...windowArray,'arm'])
              changeWindowActive({...windowActive,arm:true})
            }
            else{
              document.getElementById("window-arm").scrollIntoView()
            }
          }

          document.getElementById('navbar-system').onclick = ()=>{
            if(windowActive.system===false){
              changeWindowArray([...windowArray,'system'])
              changeWindowActive({...windowActive,system:true})
            }
            else{
              document.getElementById("window-system").scrollIntoView()
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


          const loadButtons = (input)=>{
            return(
              <div style={{display:"flex",flexDirection:'row',justifyContent:"flex-end"}}>
                  <Button style={{width:77,marginRight:10,backgroundColor:'grey',borderColor:'black'}}
                    onClick={()=>{
                    handlePopout(input)
                    
                  }}
                  > Popout </Button>
                  <Button style={{width:40,backgroundColor:'red',borderColor:'black'}}
                  onClick={()=>{
                    handleClose(input)
                    
                  }}
                  > X </Button>
             </div>
            )
          }


          const handleClose = (input) =>{
            const newArray = []
           for(let i=0;i<windowArray.length;i++){
            if(windowArray[i]!==input){
              newArray.push(windowArray[i])
            }
           }
          changeWindowArray(newArray)
          changeWindowActive({...windowActive,[input]:false})
          }

          const handlePopout = (input)=>{
            const windowSettings = 'width=750, height=400';
            const openLink = '/#/' + input
            window.open(openLink,'',windowSettings)
            

          }

          

          const renderWindows = () =>{
            const ret = []

            windowArray.forEach((window)=>{

              switch(window){

                case "autonav":
                  ret.push(
                  <div id="window-autonav"style={{ paddingTop: '20px', paddingBottom: '20px',width:'49%',}}>
                    <Card style={{padding:10}}>
                      {loadButtons('autonav')}
                      <AutoNav/>
                    </Card>
                  </div>)
                  break
                
                case "payload":
                  ret.push(
                  <div id="window-payload"style={{ paddingTop: '20px', paddingBottom: '20px',width:'49%',}}>
                     <Card style={{padding:10}}>
                    {loadButtons('payload')}
                      <Payload/>
                    </Card>
                  </div>)
                  break

                case "arm":
                  ret.push(
                  <div id="window-arm"style={{ paddingTop: '20px', paddingBottom: '20px',width:'49%',}}>
                     <Card style={{padding:10}}>
                    {loadButtons('arm')}
                      <Arm/>
                    </Card>
                  </div>)
                  break

                case "system":
                  ret.push(
                  <div id="window-system"style={{ paddingTop: '20px', paddingBottom: '20px',width:'49%',}}>
                    <Card style={{padding:10}}>
                    {loadButtons('system')}
                      <System/>
                    </Card>
                  </div>)
                  break

                default:
                  


              }

            })

            return ret

          }

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
               
                  
                  {renderWindows()}


                </div>

              </Col>

            </Row>
            
          
            
          </div>
          )
        
    
}

export default Home;
