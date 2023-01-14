import React, { useState, useEffect } from 'react';
import { Grid, Header, Button, Input, Form, Label } from 'semantic-ui-react';
import axios from "axios";

function Payload() {
  const [payloadData, setPayloadData] = useState(null);
  const [newData, setData] = useState({
    id: "",
    data: ""
  });

  useEffect(() => {
    axios({
	    method: "GET",
	    url:"/payload/2",
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
  
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...newData,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payData = {
      id: newData.id,
      data: newData.data
    };
    axios.post("/payload", payData).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
    });
	
  };

  return (
    <div id="payload-page">
      <Header as="h1">THIS IS PAYLOAD</Header>
	  {payloadData && <div>
	  <Header as="h2">id: {payloadData.id}</Header>
	  <Header as="h2">data: {payloadData.data}</Header>
	  </div>
          }
	  {/*
      <Form action='/payload' method="POST">
        <Form.Field>
	  <Label>Data</Label>
	  <Input placeholder='Data' id='data' name='data'/>
	  <Input placeholder='ID'  id='id' name='id' value='0'/>
	</Form.Field>
	<Button type='submit'>Submit</Button>
      </Form>*/}
	  <Form onSubmit={handleSubmit}>
<Input type="text" name="data" placeholder="enter data" value={newData.data} onChange={handleChange}/><br />
<Button type="submit">Submit</Button>
</Form>
    </div>
  );
}

export default Payload;

