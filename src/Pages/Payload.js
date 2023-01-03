import React, { useState, useEffect } from 'react';
import { Grid, Header, Button, Input } from 'semantic-ui-react';
import axios from "axios";

function Payload() {

  const [payloadData, setPayloadData] = useState(null);

  useEffect(() => {
    axios({
	    method: "GET",
	    url:"/payload/1",
    }).then((response) => {
	    const res = response.data;
	    setPayloadData(({
		 id: res.id,
		 data: res.data}))
    }).catch((error) => {
	    if (error.response) {
		    console.log(error.response);
		    console.log(error.response.status);
		    console.log(error.response.headers);
	    }
    })},[])
  
  return (
    <div id="payload-page">
      <Header as="h1">THIS IS PAYLOAD</Header>
	  {payloadData && <div>
	  <Header as="h2">id: {payloadData.id}</Header>
	  <Header as="h2">data: {payloadData.data}</Header>
	  </div>
}
    </div>
  );
}

export default Payload;

