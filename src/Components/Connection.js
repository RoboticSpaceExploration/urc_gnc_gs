import React, {Component} from 'react';
import { Message } from 'semantic-ui-react';

class Connection extends Component {
    state = { connected: false, ros: null};

    constructor() {
        super();
        this.init_connection();
    }

    init_connection(){
        this.state.ros = new window.ROSLIB.Ros();
        console.log(this.state.ros);

        this.state.ros.on("connection", ()=> {
            console.log("connection established");
            this.setState({connected: true }); 
        });

        this.state.ros.on("close", ()=> {
            console.log("connection is closed");
            this.setState({connected: false });
            //try to reconnect every 3 seconds
            setTimeout(()=> {
                try {
                    this.state.ros.connect("ws://192.168.1.145:9090");
                }
                catch (error ){
                    console.log("connection problem");
                }
            }, 3000);

        });

        try {
            this.state.ros.connect("ws://192.168.1.145:9090");
        }
        catch (error ){
            console.log("connection problem");
        }
    }

    render() {
        return (
            <Message className="text-center m-3"
            variant={this.state.connected? "success": "danger"}>
                {this.state.connected? "Robot Connected": "Robot Disconnected"}</Message>
        )
    }
}

export default Connection;