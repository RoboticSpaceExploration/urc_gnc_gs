import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import Camera from "../Components/Camera";



function Payload() {
  const cardStyle = { height: "40vh", width: "20vw" };
  const titleStyle = { textAlign: "center", marginBottom: "10px" };
  const rowStyle = { justifyContent: 'center', textAlign: 'center', verticalAlign: '50%', display: 'flex', alignItems: 'center' };

  const [payloadData, setPayloadData] = useState(null);
  const [newData, setData] = useState({
    data: "",
  });
  const [newTemp, setTemp] = useState({
    temperature: null,
  });

  //stores table data
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:9000/payload",
    })
      .then((response) => {
        const res = response.data;
        setRowData(res);
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
    // ?e.preventDefault();
    // const payData = {
    //   id: newData.id,
    //   data: newData.data,
    // };
    axios.post("http://localhost:9000/payload", rowData).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
      window.location.reload();
    });
  };

  const tempHandleChange = (e) => {
    const value = e.target.value;
    setTemp({
      ...newTemp,
      [e.target.name]: value,
    });
  };

  const tempHandleSubmit = (e) => {
    e.preventDefault();
    const tempData = {
      id: newTemp.id,
      temperature: newTemp.temperature,
    };
    axios.post("http://localhost:9000/temp", tempData).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
      window.location.reload();
    });
  };

  // table configurations
  const gridOptions = {
    columnDefs: [
      {
        headerName: 'Sample Number',
        field: 'sample_number',
        valueGetter: (params) => {
          return params.data.sample_number;
        },
        valueSetter: (params) => {
          var valueChanged = params.data.sample_number !== params.newValue;
          if (valueChanged) {
            params.data.sample_number = params.newValue;
          }
          return valueChanged;
        },
      },
      {
        headerName: 'Mineral Detection Time of Bubbling (s)',
        field: 'mineral_detection_time',
        valueGetter: (params) => {
          return params.data.mineral_detection_time;
        },
        valueSetter: (params) => {
          var valueChanged = params.data.mineral_detection_time !== params.newValue;
          if (valueChanged) {
            params.data.mineral_detection_time = params.newValue;
          }
          return valueChanged;
        },
      },
      {
        headerName: 'Metal Detection',
        field: 'metal_detection',
        valueGetter: (params) => {
          return params.data.metal_detection;
        },
        valueSetter: (params) => {
          var valueChanged = params.data.metal_detection !== params.newValue;
          if (valueChanged) {
            params.data.metal_detection = params.newValue;
          }
          return valueChanged;
        },
      },
      {
        headerName: 'Ethidium Bromide (M)',
        field: 'eth',
        valueGetter: (params) => {
          return params.data.eth;
        },
        valueSetter: (params) => {
          var valueChanged = params.data.eth !== params.newValue;
          if (valueChanged) {
            params.data.eth = params.newValue;
          }
          return valueChanged;
        },
      },
      {
        headerName: 'Coomassie Stain',
        field: 'coo',
        valueGetter: (params) => {
          return params.data.coo;
        },
        valueSetter: (params) => {
          var valueChanged = params.data.coo !== params.newValue;
          if (valueChanged) {
            params.data.coo = params.newValue;
          }
          return valueChanged;
        },
      },
      {
        headerName: 'Conclusion',
        field: 'conclusion',
        valueGetter: (params) => {
          return params.data.conclusion;
        },
        valueSetter: (params) => {
          var valueChanged = params.data.conclusion !== params.newValue;
          if (valueChanged) {
            params.data.conclusion = params.newValue;
          }
          return valueChanged;
        },
      },
      {
        headerName: 'High Value Sample',
        field: 'high_value_sample',
        valueGetter: (params) => {
          return params.data.high_value_sample;
        },
        valueSetter: (params) => {
          var valueChanged = params.data.high_value_sample !== params.newValue;
          if (valueChanged) {
            params.data.high_value_sample = params.newValue;
          }
          return valueChanged;
        },
      },
      {
        headerName: 'Notes',
        field: 'notes',
        valueGetter: (params) => {
          return params.data.notes;
        },
        valueSetter: (params) => {
          var valueChanged = params.data.notes !== params.newValue;
          if (valueChanged) {
            params.data.notes = params.newValue;
          }
          return valueChanged;
        },
      },


    ],
    defaultColDef: {
      flex: 1,
      resizable: true,
      editable: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    },
    rowData: rowData,
  };


  const onCellValueChanged = (event) => {
    console.log('Current data holds ', rowData);
  };

  const addRow = () => {
    setRowData([
      ...rowData,
      { sample_number: "--enter value--", mineral_detection_time: "--enter value--", metal_detection: "--enter value--", eth: "--enter value--", coo: "--enter value--", conclusion: "--enter value--", high_value_sample: "--enter value--", notes: "--enter value--" }
    ])
  }

  const removeRow = () => {
    rowData.pop();
    setRowData([
      ...rowData]);
  }

  const refreshData = () => {
    setRowData([
      ...rowData]);
  }

  return (
    <div id="payload-page">
      <h1>PAYLOAD</h1>
      <Form onSubmit={dataHandleSubmit}>
        <Form.Control
          type="text"
          name="data"
          placeholder="enter data"
          onChange={dataHandleChange}
        />
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </Form>
      <Form onSubmit={tempHandleSubmit}>
        <Form.Control
          type="number"
          step="0.01"
          name="temperature"
          placeholder="enter temperature"
          onChange={tempHandleChange}
        />
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </Form>
      <br />
      <Row style={rowStyle}>
        <Col>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title>Camera 1</Card.Title>
              <Camera/>

            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title>Camera 2</Card.Title>

            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Title>Camera 3</Card.Title>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Button onClick={addRow}>Add Entry</Button>
      <Button onClick={removeRow}>Remove Previous Entry</Button>
      <Row style={rowStyle}>
        <div
          className="ag-theme-alpine"
          style={{ height: "40vh", width: "75vw", float: "right" }}
        >


          <AgGridReact
            columnDefs={gridOptions.columnDefs}
            defaultColDef={gridOptions.defaultColDef}
            rowData={gridOptions.rowData}
            onCellValueChanged={onCellValueChanged.bind(this)}
            onCellEditingStopped={dataHandleSubmit}
            singleClickEdit={true}

          />

        </div>
        {rowData &&
          rowData.map((data, index) => {
            return (
              <div key={index}>
                <p>Added Sample {data.sample_number}</p>
              </div>
            );
          })}
      </Row>
    </div>
  );
}


export default Payload;

