import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

function Payload() {
  const [ payloadValidated, setPayloadValidated ] = useState(false);
  const [ tempValidated, setTempValidated ] = useState(false);
  const [payloadData, setPayloadData] = useState(null);
  const [newData, setData] = useState({
    data: ""
  });
  const [newTemp, setTemp] = useState({
      temperature: null
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

  const dataHandleChange = (e) => {
    const value = e.target.value;
    setData({
      ...newData,
      [e.target.name]: value
    });
  };

  const dataHandleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
        e.stopPropagation();
    }

    setPayloadValidated(true);
    const payData = {
      id: newData.id,
      data: newData.data
    };
    if (payData.data){
        axios.post("http://localhost:9000/payload", payData).then((response) => {
            console.log(response.status);
            console.log(response.data.token);
            window.location.reload();
        });
    }

  };

    const tempHandleChange = (e) => {
        const value = e.target.value;
        setTemp({
            ...newTemp,
            [e.target.name]: value
        });
    };

    const tempHandleSubmit = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setTempValidated(true);
        const tempData = {
            temperature: newTemp.temperature
        };
        if (tempData.temperature) {
            axios.post("http://localhost:9000/temp", tempData).then((response) => {
                console.log(response.status);
                console.log(response.data.token);
                window.location.reload();
            });
        }
    };

  return (
    <div id="payload-page">
      <h1>PAYLOAD</h1>
	  {payloadData &&
          payloadData.map((data, index) => {
              console.log(data);
              return (
                  <div>
                      <h2>id: {data.id}</h2>
                      <h2>data: {data.data}</h2>
                  </div>
              );
          })
      }
	  <Form noValidate validated={payloadValidated} onSubmit={dataHandleSubmit}>
          <Form.Control type="text" name="data" placeholder="enter data" onChange={dataHandleChange} required/>
          <Form.Control.Feedback type="invalid">
              Please provide data.
          </Form.Control.Feedback>
        <Button type="submit" variant="secondary">Submit</Button>
      </Form>
      <Form noValidate validated={tempValidated} onSubmit={tempHandleSubmit}>
          <Form.Control type="number" step="0.01" name="temperature" placeholder="enter temperature" onChange={tempHandleChange} required/>
          <Form.Control.Feedback type="invalid">
              Please valid input.
          </Form.Control.Feedback>
          <Button type="submit" variant="secondary">Submit</Button>
      </Form>
    </div>
  );
}

export default Payload;

