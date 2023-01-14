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
    "visible": false
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

//sample payload data
const payloadData = [
  {
    "id": 1,
    "data": "this"
  }
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
  //res.send("payload get endpoint");
  res.json(payloadData);
});

app.get('/payload/:id', (req, res) => {
  const payloadId = Number(req.params.id);
  const getPayload = payloadData.find((payload) => payload.id === payloadId);

  if (!getPayload) {
    res.status(500).send('not found');
  } else {
    res.json(getPayload);
  }
});

app.post('/payload', (req, res) => {
  const newDataPoint = req.body;
  newDataPoint.id = payloadData.length + 1;
  payloadData.push(newDataPoint);
  res.json(payloadData);
});

app.put('/payload/:id', (req, res) => {
  const payloadId = Number(req.params.id);
  const body = req.body;
  const payload = payloadData.find((payload) => payload.id === payloadId);
  const index = payloadData.indexOf(payload);

  if (!payload) {
    res.status(500).send('waypoint not found');
  } else {
    const updated = { ...payload, ...body };

    payloadData[index] = updated;

    res.send(updated);
  }
});

app.delete('/payload/:id', (req, res) => {
  const payloadId = Number(req.params.id);
  const newPayloadData = payloadData.filter((payload) => payload.id != payloadId);

  if (!newPayloadData) {
    res.status(500).send('not found');
  } else {
    payloadData = newPayloadData;
    res.send(payloadData);
  }
});

app.post('/autonav', (req, res) => {
  console.log("autonav post endpoint");
});

app.listen(9000, () => console.log('app is listening to port 9000'));
