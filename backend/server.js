const express = require('express');
const serveIndex = require('serve-index');
const cors = require('cors');

const app = express();

//sample waypoint data
const waypoints = [
  {
    "id": 1,
    "type": "AR tag",
    "latitude": 0,
    "longitude": 0,
    "visited": true,
    "visibile": false
  },
  {
    "id": 2,
    "type": "Goal",
    "latitude": 2,
    "longitude": 4,
    "visited": true,
    "visible": true
  }
]

const payloadData = [
]

app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

app.use('/request-type', (req, res, next) => {
  console.log('request type: ', req.method);
  next();
});

app.use(cors());
app.use('/public', express.static('public'));
app.use('/public', serveIndex('public'));

app.get('/', (req, res) => {
  res.send('successful response');
});

app.get('/waypoints', (req, res) => {
  res.json(waypoints);
});

app.get('/waypoints/:id', (req, res) => {
  const waypointId = Number(req.params.id);
  const getWaypoint = waypoints.find((waypoint) => waypoint.id === waypointId);

  if (!getWaypoint) {
    res.status(500).send('not found');
  } else {
    res.json(getWaypoint);
  }
});

app.post('/waypoints', (req, res) => {
  const newWaypoint = req.body;

  waypoints.push(newWaypoint);

  res.json(waypoints);
});


app.put('/waypoints/:id', (req, res) => {
  const waypointId = Number(req.params.id);
  const body = req.body;
  const waypoint = waypoints.find((waypoint) => waypoint.id === waypointId);
  const index = waypoints.indexOf(waypoint);

  if (!waypoint) {
    res.status(500).send('waypoint not found');
  } else {
    const updated = { ...waypoint, ...body };

    waypoints[index] = updated;
	
    res.send(updated);
  }
});

app.delete('/waypoints/:id', (req, res) => {
  const waypointId = Number(req.params.id);
  const newWaypoints = waypoints.filter((account) => account.id != accountId);

  if (!newWaypoints) {
    res.status(500).send('not found');
  } else {
    waypoints = newWaypoints;
    res.send(waypoints);
  }
});

app.get('/payload', (req, res) => {
  res.send("payload get endpoint");
  //res.json(payloadData);
});

app.post('/payload/data_point/:id', (req, res) => {
  const newDataPoint = req.body;
  payloadData.push(newDatPoint);
  res.json(payloadData);
});

app.post('/autonav', (req, res) => {
  console.log("autonav post endpoint");
});

app.listen(9000, () => console.log('app is listening to port 9000'));
