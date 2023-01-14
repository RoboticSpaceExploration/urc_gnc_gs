import React, { useEffect, useState } from 'react';
import {Grid, Header, Button, Input, Feed, Icon, Form} from 'semantic-ui-react';
import axios from 'axios';
import RoseLogo from '../Images/rose-logo.png';
import AutoNavLogo from '../Images/autonav.png';
import RoverDataLogo from '../Images/rover-data.png';
import PayloadLogo from '../Images/payload.png';
import ArmLogo from '../Images/arm.png';

function AutoNav() {
  const [ waypointData, setWaypointData] = useState(null);
  const [ newCoord, setCoord ] = useState({
      xCoordinate: null,
      yCoordinate: null
  });

  useEffect(() => {
    axios({
	    method: "GET",
	    url:"http://localhost:9000/waypoints",
    }).then((response) => {
	    const res = response.data;
	    setWaypointData(res);
    }).catch((error) => {
	    if (error.response) {
		    console.log(error.response);
		    console.log(error.response.status);
		    console.log(error.response.headers);
	    }
    })},[])

    const handleChange = (e) => {
        const value = e.target.value;
        setCoord({
            ...newCoord,
            [e.target.name]: value
        });
        console.log(newCoord);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const coordData = {
            xCoordinate: newCoord.xCoordinate,
            yCoordinate: newCoord.yCoordinate
        };
        console.log(coordData);
        axios.post("http://localhost:9000/autonav", coordData).then((response) => {
            console.log(response.status);
            console.log(response.data.token);
            window.location.reload();
        });
    };

    return (
        <Grid Container id="autonav-page" centered celled columns={2}>
          <Grid.Row>
            <Grid.Column>
	      <Header as="h1" textAlign="center">AutoNav</Header>
            </Grid.Column>
            <Grid.Column>
	      <Header as="h1" textAlign="center">
	        <Icon name="circle" size="huge" color="purple"/>
	        Indicator
	      </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
	      <Header as="h1" textAlign="center">Queue List</Header>
	      <Feed>
                <Feed.Event
                  image={RoseLogo}
                  content='The Rover did thing 1'
                />
                <Feed.Event>
                  <Feed.Label image={AutoNavLogo} />
                  <Feed.Content content='The Rover did thing 2' />
                </Feed.Event>
                <Feed.Event>
                  <Feed.Label image={RoverDataLogo} />
                  <Feed.Content content='The Rover did thing 3' />
                </Feed.Event>
                <Feed.Event>
                  <Feed.Label image={ArmLogo} />
                  <Feed.Content content='The Rover did thing 4' />
                </Feed.Event>
                <Feed.Event>
                  <Feed.Label image={PayloadLogo} />
                  <Feed.Content content='The Rover did thing 5' />
                </Feed.Event>
              </Feed>
            </Grid.Column>
            <Grid.Column>
	      <Header as="h1" textAlign="center">Map</Header>
	      {waypointData &&
              waypointData.map((waypoint, index) => {
                  console.log(waypoint);
                  return (
                    <div>
                      <Header as="h1" textAlign="center">id: {waypoint.id}</Header>
                      <Header as="h1" textAlign="center">type: {waypoint.type}</Header>
                      <Header as="h1" textAlign="center">latitude: {waypoint.latitude}</Header>
                      <Header as="h1" textAlign="center">longitude: {waypoint.longitude}</Header>
                      <Header as="h1" textAlign="center">visited: {waypoint.visited}</Header>
                      <Header as="h1" textAlign="center">visible: {waypoint.visible}</Header>
                    </div>
                  );
                })
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
            <Form onSubmit={handleSubmit}>
                <Input type="number" name="xCoordinate" placeholder="enter x-coordinate" onChange={handleChange}/>
                <Input type="number" name="yCoordinate" placeholder="enter y-coordinate" onChange={handleChange}/>
                <Button type="submit" >Submit</Button>
            </Form>
        </Grid>
    );
}

export default AutoNav;
