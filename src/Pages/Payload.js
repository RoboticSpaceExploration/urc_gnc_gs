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
import { Header, Button, Input, Form } from "semantic-ui-react";
import axios from "axios";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

function Payload() {
  const [payloadData, setPayloadData] = useState(null);
  const [newData, setData] = useState({
    data: "",
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

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...newData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
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

    width: 50,
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
        })}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="data"
          placeholder="enter data"
          onChange={handleChange}
        />
        <Button type="submit">Submit</Button>
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
