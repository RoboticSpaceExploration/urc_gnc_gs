const express = require("express");
const serveIndex = require("serve-index");
const cors = require("cors");

const app = express();

//sample waypoint data
let waypoints = [
  {
    id: 1,
    type: "AR tag",
    position: [21.2992, -157.8148],
    visited: true,
    visible: false,
  },
  {
    id: 2,
    type: "Goal",
    position: [21.3, -157.8155],
    visited: true,
    visible: true,
  },
  {
    id: 3,
    type: "Goal",
    position: [21.2995, -157.8159],
    visited: true,
    visible: true,
  },
];

//sample payload data
let payloadData = [
];

//sample queue list
let queueList = [
  {
    queue: 1,
    longitude: 12,
    latitude: 14,
  },
];
let linSpeed = 1;
let angSpeed = 0.5;

//sample temperature data
let tempList = [];

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
app.use("/public", express.static("public"));
app.use("/public", serveIndex("public"));

const { body, validationResult } = require("express-validator");
let start = null;

app.get("/", (req, res) => {
  res.send("successful response");
});

app.get("/linSpeed", (req, res) => {
  res.send(''+linSpeed);
});

app.put("/linSpeed/increase", (req, res) => {
  if (linSpeed < 100) { linSpeed += 1; }
  console.log(linSpeed);

  res.send(''+linSpeed);
});

app.put("/linSpeed/decrease", (req, res) => {
  if (linSpeed > 1) { linSpeed -= 1; }
  console.log(linSpeed);

  res.send(''+linSpeed);
});

app.get("/angSpeed", (req, res) => {
  res.send(''+angSpeed);
});

app.put("/angSpeed/increase", (req, res) => {
  if (angSpeed < 100) { angSpeed += 0.5; }
  console.log(angSpeed);

  res.send(''+angSpeed);
});

app.put("/angSpeed/decrease", (req, res) => {
  if (angSpeed > 0.5) { angSpeed -= 0.5; }
  console.log(angSpeed);

  res.send(''+angSpeed);
});

app.get("/waypoints", (req, res) => {
  res.json(waypoints);
});

app.get("/waypoints/:id", (req, res) => {
  const waypointId = Number(req.params.id);
  const getWaypoint = waypoints.find((waypoint) => waypoint.id === waypointId);

  if (!getWaypoint) {
    res.status(500).send("not found");
  } else {
    res.json(getWaypoint);
  }
});

app.post("/waypoints", body("longitude").exists({ checkNull: true }), body("lattitude").exists({ checkNull: true}),(req, res) => {
  const newWaypoint = req.body;
  newWaypoint.id = waypoints.length + 1;
  waypoints.push(newWaypoint);

  res.json(waypoints);
});

app.put("/waypoints/:id", (req, res) => {
  const waypointId = Number(req.params.id);
  const body = req.body;
  const waypoint = waypoints.find((waypoint) => waypoint.id === waypointId);
  const index = waypoints.indexOf(waypoint);

  if (!waypoint) {
    res.status(500).send("waypoint not found");
  } else {
    const updated = { ...waypoint, ...body };

    waypoints[index] = updated;

    res.send(updated);
  }
});

app.delete("/waypoints/:id", (req, res) => {
  const waypointId = Number(req.params.id);
  const newWaypoints = waypoints.filter(
      (waypoint) => waypoint.id !== waypointId
  );

  if (!newWaypoints) {
    res.status(500).send("not found");
  } else {
    waypoints = newWaypoints;
    res.send(waypoints);
  }
});

app.get("/payload", (req, res) => {
  //res.send("payload get endpoint");
  res.json(payloadData);
});

app.get("/payload/:id", (req, res) => {
  const payloadId = Number(req.params.id);
  const getPayload = payloadData.find((payload) => payload.id === payloadId);

  if (!getPayload) {
    res.status(500).send("not found");
  } else {
    res.json(getPayload);
  }
});

app.post("/payload", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newDataPoint = req.body;
  payloadData.push(newDataPoint);
  res.json(payloadData);
});

app.put("/payload/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newPayloadData = req.body;
  console.log(newPayloadData);
  payloadData = newPayloadData;
  res.json(payloadData);
});

app.delete("/payload/:sample_number", (req, res) => {
  const rowId = Number(req.params.sample_number);
  const newPayloadData = payloadData.filter(
      (payload) => payload.sample_number !== rowId
  );
  if (!newPayloadData) {
    res.status(500).send("not found");
  } else {
    payloadData = newPayloadData;
    res.send(payloadData);
  }
});

app.get("/temp", (req, res) => {
  res.json(tempList);
});

app.post(
    "/temp",
    body("temperature").exists({ checkNull: true }),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newTemp = req.body;

      if (tempList.length === 0) {
        start = Math.floor(Date.now() / 60000);
      }

      newTemp.time = Math.floor(Date.now() / 60000) - start;
      newTemp.id = tempList.length + 1;

      tempList.push(newTemp);
      res.json(tempList);
    }
);

app.get("/autonav", (req, res) => {
  res.json(queueList);
});

app.post(
    "/autonav",
    body("latitude").exists({ checkNull: true }),
    body("longitude").exists({ checkNull: true }),
    (req, res) => {
      //error check; returns error status if there are any
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newCoordinates = req.body;
      newCoordinates.queue = queueList.length + 1;
      queueList.push(newCoordinates);
      res.json(queueList);
    }
);

app.delete("/autonav/:queue", (req, res) => {
  //finds the item in queue to delete
  const queueId = Number(req.params.queue);

  //creates new list without the queue
  const newQueueList = queueList.filter(
      (queueItem) => queueItem.queue !== queueId
  );

  //check to see if newQueueList exists
  if (!newQueueList) {
    res.status(500).send("not found");
  } else {
    //updates the queue according to which item was deleted
    queueList = newQueueList.map((queueItem) => {
      let newQueue = null;

      //check to see how to update the queue
      if (queueItem.queue > queueId) {
        newQueue = queueItem.queue - 1;
      } else {
        newQueue = queueItem.queue;
      }
      return {
        queue: newQueue,
        latitude: queueItem.latitude,
        longitude: queueItem.longitude,
      };
    });
    res.send(queueList);
  }
});
app.put("/autonav/", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newQueue = req.body;
  console.log(newQueue);
  queueList = newQueue;
  res.json(payloadData);
});
app.listen(9000, () => console.log("app is listening to port 9000"));
