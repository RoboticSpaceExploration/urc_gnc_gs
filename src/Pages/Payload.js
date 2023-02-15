import React, { useState, useEffect } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import { Rnd } from "react-rnd";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Camera from "../Components/Camera";
import Config from '../scripts/config';
import SideNav from '../Components/SideNav';


function Payload() {
  const cardStyle = { height: "40vh", width: "20vw"};
  const rowStyle = { justifyContent: 'center', textAlign: 'center', verticalAlign: '50%', display: 'flex', alignItems: 'center' };

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

  const dataHandleSubmit = (e) => {
    axios.put(`http://localhost:9000/payload/`, rowData).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
      // window.location.reload();
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

  function addRow() {
    const payData = {
      sample_number: rowData.length + 1,
      mineral_detection_time: "--enter value--",
      metal_detection: "--enter value--",
      eth: "--enter value--",
      coo: "--enter value--",
      conclusion: "--enter value--",
      high_value_sample: "--enter value--",
      notes: "--enter value--"
    };
    setRowData([
        ...rowData,
        payData]);
    axios.post("http://localhost:9000/payload", payData).then((response) => {
      console.log(response.status);
      console.log(response.data.token);
      // window.location.reload();
    });
  }

  function removeLatestRow() {
    if (rowData.length > 0) {
      let deletedRow = rowData.pop();
      console.log(deletedRow);
      setRowData([
        ...rowData]);
      axios.delete(`http://localhost:9000/payload/${deletedRow.sample_number}`).then((response) => {
        console.log(response.status);
        console.log(response.data.token);
        // window.location.reload();
      });
    }
  }

  return (
    <div id="payload-page">
      <h1>PAYLOAD</h1>
      <Container>
        <SideNav/>
        <Row style={rowStyle} xs="auto">
          <Col>
            <Camera style={cardStyle} topic={Config.CMD_CAM_TOPIC}/>
          </Col>
          <Col>
            <Camera style={cardStyle} topic={Config.CMD_CAM_TOPIC}/>
          </Col>
          <Col>
            <Camera style={cardStyle} topic={Config.CMD_CAM_TOPIC}/>
          </Col>
        </Row>
      </Container>
      <Container>
        <Button onClick={addRow}>Add Entry</Button>
        <Button onClick={removeLatestRow}>Remove Previous Entry</Button>
        <Row style={rowStyle}>
          <div className="ag-theme-alpine"
               style={{ height: "40vh", width: "75vw", float: "right" }}>
            <AgGridReact
              columnDefs={gridOptions.columnDefs}
              defaultColDef={gridOptions.defaultColDef}
              rowData={gridOptions.rowData}
              onCellValueChanged={onCellValueChanged.bind(this)}
              onCellEditingStopped={dataHandleSubmit}
              singleClickEdit={true}
            />
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Payload;

