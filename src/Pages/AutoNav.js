import React from 'react';
import { Grid, Header, Button, Input, Feed, Icon } from 'semantic-ui-react';
import RoseLogo from '../Images/rose-logo.png';
import AutoNavLogo from '../Images/autonav.png';
import RoverDataLogo from '../Images/rover-data.png';
import PayloadLogo from '../Images/payload.png';
import ArmLogo from '../Images/arm.png';

class AutoNav extends React.Component {
  render() {
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
  };
}

export default AutoNav;
