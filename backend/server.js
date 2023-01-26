const express = require('express');
const serveIndex = require('serve-index');
const cors = require('cors');

const app = express();

//sample waypoint data
let waypoints = [
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
let payloadData = [
  {
    "id": 1,
    "data": "this"
  }
]

//sample queue list
let queueList = [
  {
    "queue" : 1,
    "longitude": 12,
    "latitude": 14
  }
]

//sample temperature data
let tempList = [
]


/*
app.use((req, res, next) => {
  console.log('Time at server call: ', Date.now());
  next();
});

app.use('/request-type', (req, res, next) => {
  console.log('request type: ', req.method);
  next();
});
*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('public'));
app.use('/public', serveIndex('public'));

const { body, validationResult } = require('express-validator');
let start = null;

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
  newWaypoint.id = waypoints.length + 1;
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
  const newWaypoints = waypoints.filter((waypoint) => waypoint.id !== waypointId);

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

app.post('/payload', body('data').notEmpty(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
  const newPayloadData = payloadData.filter((payload) => payload.id !== payloadId);

  if (!newPayloadData) {
    res.status(500).send('not found');
  } else {
    payloadData = newPayloadData;
    res.send(payloadData);
  }
});

app.get('/temp', (req, res) => {
  res.json(tempList);
})

app.post('/temp', body('temperature').exists({ checkNull: true}), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newTemp = req.body;

  if (tempList.length === 0) {
    start = (Math.floor(Date.now() / 60000));
  }

  newTemp.time = (Math.floor(Date.now() / 60000)) - start;
  newTemp.id = tempList.length + 1;

  tempList.push(newTemp);
  res.json(tempList);
});

app.get('/autonav', (req, res) => {
  res.json(queueList);
});

app.post('/autonav', body('latitude').exists({ checkNull: true }), body('longitude').exists({ checkNull: true }), (req, res) => {
  //error check; returns error status if there are any
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newCoordinates = req.body;
  newCoordinates.queue = queueList.length + 1;
  queueList.push(newCoordinates);
  res.json(queueList);
});

app.delete('/autonav/:queue', (req, res) => {
  console.log("made it to delete");
  const queueId = Number(req.params.queue);
  const newQueueList = queueList.filter((queueItem) => queueItem.queue !== queueId);

  if (!newQueueList) {
    res.status(500).send('not found');
  } else {
    queueList = newQueueList.map((queueItem) => {
            return {
              queue: queueItem.queue - 1,
              latitude: queueItem.latitude,
              longitude: queueItem.longitude
            }
          }
        );
    res.send(queueList);
  }
});

app.listen(9000, () => console.log('app is listening to port 9000'));
