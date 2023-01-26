import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function Payload() {
  const [payloadData, setPayloadData] = useState(null);
  const [newData, setData] = useState({
    data: "",
  });
  const [newTemp, setTemp] = useState({
      temperature: null
  });

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:9000/payload",
    })
      .then((response) => {
        const res = response.data;
        setPayloadData(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }, []);

  const dataHandleChange = (e) => {
    const value = e.target.value;
    setData({
      ...newData,
      [e.target.name]: value,
    });
  };

  const dataHandleSubmit = (e) => {
    e.preventDefault();
    const payData = {
      id: newData.id,
      data: newData.data,
    };
    axios.post("http://localhost:9000/payload", payData).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
      window.location.reload();
    });
  };

    const tempHandleChange = (e) => {
        const value = e.target.value;
        setTemp({
            ...newTemp,
            [e.target.name]: value
        });
    };

    const tempHandleSubmit = (e) => {
        e.preventDefault();
        const tempData = {
            id: newTemp.id,
            temperature: newTemp.temperature
        };
        axios.post("http://localhost:9000/temp", tempData).then((response) => {
            console.log(response.status);
            console.log(response.data.token);
            window.location.reload();
        });
    };

  // data for scatter plot
  const data = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: [
          {
            x: -10,
            y: 0,
          },
          {
            x: 0,
            y: 10,
          },
          {
            x: 10,
            y: 5,
          },
          {
            x: 0.5,
            y: 5.5,
          },
        ],
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
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
	  <Form onSubmit={dataHandleSubmit}>
          <Form.Control type="text" name="data" placeholder="enter data" onChange={dataHandleChange}/>
        <Button type="submit" variant="secondary">Submit</Button>
      </Form>
      <Form onSubmit={tempHandleSubmit}>
          <Form.Control type="number" step="0.01" name="temperature" placeholder="enter temperature" onChange={tempHandleChange}/>
          <Button type="submit" variant="secondary">Submit</Button>
      </Form>

      {/* Use LAYOUT to rearrange the positions after migrating to Bootstrap */}

      {/* Scatter Plot */}
      <div
        id="chartContainer"
        style={{ height: "40vh", width: "50vw", float: "right" }}
      >
        <Scatter options={options} data={data} />
      </div>

      {/* Camera feed 1 */}
      <div style={{ width: "30vw", height: "40vh", backgroundColor: "black" }}>
        <p style={{ color: "white" }}>Camera Feed 1</p>
      </div>

      {/* Camera feed 2 */}
      <div style={{ width: "30vw", height: "40vh", backgroundColor: "black" }}>
        <p style={{ color: "white" }}>Camera Feed 2</p>
      </div>

      {/* Camera feed 3 */}
      <div style={{ width: "30vw", height: "40vh", backgroundColor: "black" }}>
        <p style={{ color: "white" }}>Camera Feed 3</p>
      </div>
    </div>
  );
}

export default Payload;
