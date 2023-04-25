import React from 'react';
import { Alert } from 'react-bootstrap';
import { init_ros_connection } from '../ROSConnection';

class Connection extends React.Component {
    render() {
        return (
            <Alert className="text-center"
            variant={init_ros_connection.connected ? 'success': 'danger'}>
              <h5>
                {init_ros_connection.connected ? "Robot Connected": "Robot Disconnected"}
              </h5>
            </Alert>
        )
    }
}

export default Connection;
