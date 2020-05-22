var app = require("express")();
var http = require("http").createServer(app);
var https = require("https");
var mqtt = require("mqtt");
var io = require("socket.io")(http);
var PORT = 3000;
var protobuf = require("protobufjs");

var baseURL = "mqtt://tracking-dev.map.ir";

var getOption = {
  host: "tracking-dev.map.ir",
  method: "POST",
  path: "/",
  headers: {
    "Content-Type": "application/json",
    "x-api-key":
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIwYzI3Zjc2NDUyNjBkZDA4MDA3ODRhOGEzYmNjYzYxNDBmNTZlMzUzNGU2ZTk4ZGRiMzJhZmQ0MzBmOTEyYmNmMzEzMWM5OTZhODQyYjUyIn0.eyJhdWQiOiI3NzgxIiwianRpIjoiYjBjMjdmNzY0NTI2MGRkMDgwMDc4NGE4YTNiY2NjNjE0MGY1NmUzNTM0ZTZlOThkZGIzMmFmZDQzMGY5MTJiY2YzMTMxYzk5NmE4NDJiNTIiLCJpYXQiOjE1ODc0NDcyMTksIm5iZiI6MTU4NzQ0NzIxOSwiZXhwIjoxNTkwMDM5MjE5LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.OmGhq-VOb9UsPwr8_MaXsFSOG8PEHpW85oyEOK6kg-ayaRPjJtWtoFc0ScF3wPNTn1QZDVB2oqQYaaIAey2gEew0XciCtLYi7-BSaXBvgYbXAe-Q3Ni02AiXI8QS2p-zPkXS9wjUqQSLfZdLjXzcyZAvMw8Q7TZPa3jxym9Y8l98frAW2V76ey_SMl31mewZFryxPpZPrTvONfZCTFCJ-Qeiqm3N70sngW-wrpzBPrZjzQKXhp4MNeIwEdzV4GR3agA8aCD59gDte2aCOUJEM8TY8b_bYDGiplLpJPkA3tUkaPCsKGfnxX7aC0TWFxbRBZ6mhR7bHb0uADO7UYRWaA",
  },
};

var data = JSON.stringify({
  type: "subscriber",
  track_id: "1",
  device_id: "123456",
});

var topic = "";

var client = mqtt.connect(baseURL, [
  {
    username: "guest",
    password: "guest",
    port: 1883,
    clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
    protocolId: "MQTT",
    protocolVersion: 4,
  },
]);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
var req = https.request(getOption, function (res) {
  console.log("statusCode:", res.statusCode);
  res.setEncoding("utf8");
  res.on("data", (d) => {
    var data = JSON.parse(d);
    console.log("\x1b[34m%s\x1b[0m", "Getting topic: " + data.data.topic);
    topic = data.data.topic;
  });
  res.on("end", function () {
    console.log("\x1b[32m%s\x1b[0m", "Getting topic is done!");
  });
  res.on("error", (e) => {
    console.error(e.message);
  });
});
req.write(data);

req.on("error", function (err) {
  console.log("\x1b[31m%s\x1b[0m", "Error: " + err.message);
});

client.on("connect", function () {
  console.log("\x1b[34m%s\x1b[0m", "Connecting to: " + topic);
  client.subscribe("#", function (err) {
    console.log("\x1b[31m%s\x1b[0m", "Can not subscribe because of " + err);
  });
});

req.end();

io.on("connection", function (socket) {
  console.log("\x1b[33m%s\x1b[0m", "A device connected!");
  client.on("message", function (topic, message) {
    console.log("\x1b[32m%s\x1b[0m", "A message has been recieved!");

    // message is Buffer
    protobuf.load("LiveV1.proto", function (err, root) {
      if (err) throw err;
      var AwesomeMessage = root.lookupType("Tutorial.LiveV1");
      var message2 = AwesomeMessage.decode(message);
      var object = AwesomeMessage.toObject(message2, {
        enums: String,
        longs: String,
        bytes: String,
        defaults: true,
        arrays: true,
        objects: true,
        oneofs: true,
      });
      console.log("The message is: " + object.location);
      socket.emit("news", object);
    });
  });
});

http.listen(PORT, function () {
  console.log("\x1b[36m%s\x1b[0m", "listening on *:" + PORT);
});
