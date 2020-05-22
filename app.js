$(document).ready(function () {
  var app = new Mapp({
    element: "#app",
    presets: {
      latlng: {
        lat: 32,
        lng: 52,
      },
      zoom: 6,
    },
    apiKey:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE1M2U0ZmFhNGE2M2ZkYzliOWE1NzM5MzM3MTE3YWE3NWRiZmQzYzBmOTJlMDg2MGFlMGEyZGY1YzE3NWFlNjY4ZmY5OTkwNDNjOWU4NGY3In0.eyJhdWQiOiI2OTQzIiwianRpIjoiYTUzZTRmYWE0YTYzZmRjOWI5YTU3MzkzMzcxMTdhYTc1ZGJmZDNjMGY5MmUwODYwYWUwYTJkZjVjMTc1YWU2NjhmZjk5OTA0M2M5ZTg0ZjciLCJpYXQiOjE1ODg0MTQ2MjYsIm5iZiI6MTU4ODQxNDYyNiwiZXhwIjoxNTg5MTA1ODI2LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.FPaXb1mEU2CdF6cpQsoHgh8UhIHLO1Wm5YrKxuz8yP8UgGowMicDCY4aXpYiacIqE7cnySqNZxXNDjmpHwqFLjl887js-rKONIaXQqGqud5_2zwNfRZKVepNduLWkSfw0cz-bwS4cMfb641pIppu_csZHCnoeWM0d3PUV3pwumvQv2UW5rTsihtp4EJZYUslqJC4Wo483cn5JOYbwmeUhjZEEZtiSNuZxWWPwD6sgQH4weNmtAfYLCt4IL2eK58Q87cLDCqZ85hFWcZDF00FqyU5fHQqbKSiDohKMgfSHSWqH6MZRENWyY8xs4umw7B5sb1zEPP9uAIuAE2TDNKHpw",
  });

  app.addVectorLayers();

  var socket = io("http://localhost:3000", {
    transports: ["websocket"],
    upgrade: false,
  });
  socket.on("connection", function (data) {
    console.log(data);
  });
  socket.on("news", function (data) {
    console.log(data);
    app.addMarker({
      name: "basic-marker",
      latlng: {
        lat: data.location[1],
        lng: data.location[0],
      },
      popup: {
        title: {
          html: "Basic Marker Title",
        },
        description: {
          html: "Basic marker description",
        },
        open: true,
      },
    });
  });
  socket.on("disconnect", function () {
    console.log("A user disconnected!");
  });
});
