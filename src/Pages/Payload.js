import React, { useState, useEffect } from 'react';
import { Header, Button, Input, Form } from 'semantic-ui-react';
import axios from "axios";

function Payload() {
  const [payloadData, setPayloadData] = useState(null);
  const [newData, setData] = useState({
    data: ""
  });

  useEffect(() => {
    axios({
	    method: "GET",
	    url:"http://localhost:9000/payload",
    }).then((response) => {
	    const res = response.data;
	    setPayloadData(res);
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
    axios.post("http://localhost:9000/payload", payData).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
      window.location.reload();
    });
  };

  return (
    <div id="payload-page">
      <Header as="h1">THIS IS PAYLOAD</Header>
	  {payloadData &&
          payloadData.map((data, index) => {
              console.log(data);
              return (
                  <div>
                      <Header as="h2">id: {data.id}</Header>
                      <Header as="h2">data: {data.data}</Header>
                  </div>
              );
          })
      }
	  <Form onSubmit={handleSubmit}>
          <Input type="text" name="data" placeholder="enter data" onChange={handleChange}/>
        <Button type="submit" >Submit</Button>
      </Form>
    </div>
  );
}

export default Payload;

