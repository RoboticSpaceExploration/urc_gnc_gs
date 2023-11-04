import React from 'react';
import { Alert } from 'react-bootstrap';
import { init_ros_connection } from '../ROSConnection';

class Connection extends React.Component {

  render() {

    const armMoving = true;
    const roverMoving = false;

    let message = '';
    let variant ='';

    if(init_ros_connection.connected) {
      if(armMoving){
        message = 'Rover Arm Moving'
        variant = 'primary'
      }
      else if (roverMoving) {
        message = 'Rover is Moving'
        variant = 'info'
      }
      else {
        message = 'Robot Connected'
        variant = 'success'
      }
    }
    else{
      message = 'Robot Disconnected'
      variant = 'danger'
    }

      return (
        
        <div style={{ display:'flex', justifyContent:'center',flexDirection:'row'}}>
          <Alert className="text-center" style={{ width: '100%' }} variant={variant}>
              <h5>
               {message}
              </h5>
              </Alert>     
            </div>
        )
      }
    }
export default Connection;