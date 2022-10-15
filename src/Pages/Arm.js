import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

class Arm extends React.Component {
  render() {
    return (
      <Grid Container centered id="arm-page" columns={2}>
        <Grid.Row>
          <Header as="h1" textAlign="center">ARM</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
	    <Header as="h2" textAlign="center">Cam 1</Header>
          </Grid.Column>
	  <Grid.Column>
	    <Header as="h2" textAlign="center">Cam 2</Header>
	  </Grid.Column>
	</Grid.Row>
        <Grid.Row>
	  <Grid.Column>
	    <Header as="h2" textAlign="center">WASD 1</Header>
	  </Grid.Column>
	  <Grid.Column>
	    <Header as="h2" textAlign="center">WASD 2</Header>
	  </Grid.Column>
	</Grid.Row>
      </Grid>
    );
  };
}

export default Arm;

