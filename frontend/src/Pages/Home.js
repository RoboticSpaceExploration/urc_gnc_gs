import React, { useEffect, useState } from "react";
import { Container,Row,Col, Card,Button, NavItem,Nav } from 'react-bootstrap'
import SideNav from '../Components/SideNav';
import Connection from "../Components/Connection";
import Arm from "./Arm";
import Payload from "./Payload";
import System from "./System";
import { AutoNavQueue } from "../Components/AutoNav/AutoNavQueue";
import { AutoNavMap } from "../Components/AutoNav/AutoNavMap";
import { AutoNavWaypoints } from "../Components/AutoNav/AutoNavWaypoints";
import RoverDataGPS from "./RoverData/RoverDataGPS";
import RoverDataSpeed from "./RoverData/RoverDataSpeed";
import Controls from "../Components/Controls";
import RoverDataChassisCam from "./RoverData/RoverDataChassisCam";



const Home = () => {

        useEffect(()=>{
          document.getElementById('navbar-camera').onclick = ()=>{
            console.log(windowActive);
            if(windowActive.chassis_cam === false){
              changeWindowArray([...windowArray,'chassis_cam'])
              changeWindowActive({...windowActive,chassis_cam:true})
            }
            else{
              document.getElementById("chassis-cam").scrollIntoView()
            }
          }

          document.getElementById('navbar-location').onclick = ()=>{
            if(windowActive.location===false){
              changeWindowArray([...windowArray,'location'])
              changeWindowActive({...windowActive,location:true})
            }
            else{
              document.getElementById("location").scrollIntoView()
            }
          }

          document.getElementById('navbar-speedometer').onclick = ()=>{
            if(windowActive.speedometer===false){
              changeWindowArray([...windowArray,'speedometer'])
              changeWindowActive({...windowActive,speedometer:true})
            }
            else{
              document.getElementById("speedometer").scrollIntoView()
            }
          }

          document.getElementById('navbar-teleopcontrols').onclick = ()=>{
            if(windowActive.teleopcontrols===false){
              changeWindowArray([...windowArray,'teleopcontrols'])
              changeWindowActive({...windowActive,teleopcontrols:true})
            }
            else{
              document.getElementById("teleopcontrols").scrollIntoView()
            }
          }

          document.getElementById('navbar-autonav-waypoints').onclick = ()=>{

            if(windowActive.autonavwaypoints===false){
              changeWindowArray([...windowArray,'autonavwaypoints'])
              changeWindowActive({...windowActive,autonavwaypoints:true})
            }
            else{
              document.getElementById("window-autonav-waypoints").scrollIntoView()
            }
          }

          document.getElementById('navbar-autonav-queue').onclick = ()=>{

            if(windowActive.autonavqueue===false){
              changeWindowArray([...windowArray,'autonavqueue'])
              changeWindowActive({...windowActive,autonavqueue:true})
            }
            else{
              document.getElementById("window-autonav-queue").scrollIntoView()
            }
          }

          document.getElementById('navbar-autonav-map').onclick = ()=>{

            if(windowActive.autonavmap===false){
              changeWindowArray([...windowArray,'autonavmap'])
              changeWindowActive({...windowActive,autonavmap:true})
            }
            else{
              document.getElementById("window-autonav-map").scrollIntoView()
            }
          }

          document.getElementById('navbar-arm').onclick = ()=>{
            const windowSettings = 'width=750, height=400';
            window.open('/#/arm','',windowSettings)
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

            chassis_cam:false,
            location:false,
            speedometer:false,
            teleopcontrols:false,
            autonavqueue:false,
            autonavmap:false,
            autonavwaypoints:false,
            payload:false,
            arm:false,
            system:false,
          })

          const loadButtons = (input) => {
            return(
              <div style={{display:"flex",flexDirection:'row',justifyContent:"flex-end"}}>
                  <Button style={{width:40,marginRight:10,backgroundColor:'grey',borderColor:'black'}}
                    onClick={()=>{
                    handlePopout(input)

                  }}
                  > <i className="fa-solid fa-up-right-from-square"/> </Button>
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
            handleClose(input)

            const windowSettings = 'width=750, height=400';
            const openLink = '/#/' +input

            window.open(openLink,'',windowSettings)
          }

          const renderWindows = () => {
            const ret = []

            windowArray.forEach((window)=> {

              switch(window){
                case "chassis_cam":
                  ret.push(
                      <div id="chassis_cam" style={{ paddingTop: '20px', paddingBottom: '20px',width:'100%',}}>
                        <Card style={{padding:10}}>
                          {loadButtons('chassis-cam')}
                          <RoverDataChassisCam/>
                        </Card>
                      </div>)
                  break

                case "teleopcontrols":
                  ret.push(
                    <div id="teleopcontrols"style={{ paddingTop: '20px', paddingBottom: '20px',width:'49%',}}>
                      <Card style={{padding:10}}>
                        {loadButtons('teleopcontrols')}
                        <Controls/>
                      </Card>
                    </div>)
                    break

                case "speedometer":
                  ret.push(
                    <div id="speedometer"style={{ paddingTop: '20px', paddingBottom: '20px',width:'49%',}}>
                      <Card style={{padding:10}}>
                        {loadButtons('speedometer')}
                        <RoverDataSpeed/>
                      </Card>
                    </div>)
                    break

                case "location":
                  ret.push(
                    <div id="location"style={{ paddingTop: '20px', paddingBottom: '20px',width:'49%',}}>
                      <Card style={{padding:10}}>
                        {loadButtons('location')}
                        <RoverDataGPS/>
                      </Card>
                    </div>)
                    break


                case "autonavqueue":
                  ret.push(
                  <div id="window-autonav-queue"style={{ paddingTop: '20px', paddingBottom: '20px',width:'49%',}}>
                    <Card style={{padding:10}}>
                      {loadButtons('autonavqueue')}
                      <AutoNavQueue/>
                    </Card>
                  </div>)
                  break

                case "autonavmap":
                  ret.push(
                  <div id="window-autonav-map"style={{ paddingTop: '20px', paddingBottom: '20px',width:'49%',}}>
                    <Card style={{padding:10}}>
                      {loadButtons('autonavmap')}
                      <AutoNavMap/>
                    </Card>
                  </div>)
                  break

                case "autonavwaypoints":
                  ret.push(
                  <div id="window-autonav-waypoints"style={{ paddingTop: '20px', paddingBottom: '20px',width:'49%',}}>
                    <Card style={{padding:10}}>
                      {loadButtons('autonavwaypoints')}
                      <AutoNavWaypoints/>
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

              <Col lg={2}>
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
