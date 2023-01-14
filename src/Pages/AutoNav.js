import React, { useEffect, useState } from 'react';
import { Grid, Header, Button, Input, Feed, Icon } from 'semantic-ui-react';
import axios from 'axios';
import RoseLogo from '../Images/rose-logo.png';
import AutoNavLogo from '../Images/autonav.png';
import RoverDataLogo from '../Images/rover-data.png';
import PayloadLogo from '../Images/payload.png';
import ArmLogo from '../Images/arm.png';

function AutoNav() {
  const [waypointData, setWaypointData] = useState(null);

  useEffect(() => {
    axios({
	    method: "GET",
	    url:"http://localhost:9000/waypoints/2",
    }).then((response) => {
	    const res = response.data;
	    setWaypointData(({
		 id: res.id,
		 type: res.type,
	         latitude: res.latitude,
	         longitude: res.longitude,
	         visited: res.visited,
	         visible: res.visible}))
    }).catch((error) => {
	    if (error.response) {
		    console.log(error.response);
		    console.log(error.response.status);
		    console.log(error.response.headers);
	    }
    })},[])
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
	      {waypointData && <div>
	        <Header as="h1" textAlign="center">id: {waypointData.id}</Header>
	        <Header as="h1" textAlign="center">type: {waypointData.type}</Header>
	        <Header as="h1" textAlign="center">latitude: {waypointData.latitude}</Header>
	        <Header as="h1" textAlign="center">longitude: {waypointData.longitude}</Header>
	        <Header as="h1" textAlign="center">visited: {waypointData.visited}</Header>
	        <Header as="h1" textAlign="center">visible: {waypointData.visible}</Header>
	        </div>
	      }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
	      <Input action placeholder='X-Input' />
	      <Button type='submit'>Enter</Button>
            </Grid.Column>
            <Grid.Column>
	      <Input action placeholder='Y-Input' />
	      <Button type='submit'>Enter</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
}

export default AutoNav;
