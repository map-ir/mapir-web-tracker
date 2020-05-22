# MapirWebTracker

![Map.ir](https://map.ir/css/images/mapir-logo.png)

## Get API Key

🔑 You should first get api key from [Map.ir](https://corp.map.ir/registration/)

## Installation

```
git clone https://github.com/map-ir/mapir-web-tracker.git
```

Or

```
git clone git@github.com:map-ir/mapir-web-tracker.git
```

then run

```
cd mapir-web-tracker
npm i
```

## Prerequisites

To use this tool, a publisher has to send data! So you can use [mapir-android-tracker](https://github.com/map-ir/mapir-android-tracker) or [mapir-ios-tracker](https://github.com/map-ir/mapir-ios-tracker)!

## Quick start

### Set Subscriber

Open `index.js` in editor.
Set your arbitary port on line 6:

```
var PORT = 3000;
```

Put your API-Key in line 18.
Set `track_id` and `device_id` on line 24 & 25!
Then run:

```
node index.js
```

in root directory of project!

### Show on Map

Open `App.js` in editor.
Put your API-Key in line 12.
Put the port that set on `index.js` in line 17.

```
var socket = io("http://localhost:PORT", {
    transports: ["websocket"],
    upgrade: false,
  });
```

Then serve the project on localhost!
