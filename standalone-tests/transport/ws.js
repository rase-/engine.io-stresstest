var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 3000});

var startTime = process.hrtime();
var dataStartTime;

var mode = process.argv[2];
mode = mode || 'string';
var data = (mode == 'string') ? 'trololol' : new Buffer('trololol', 'utf-8');

var received = 0;
var totalMsgs = 1000;
wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    if (received == 0) {
      dataStartTime = process.hrtime();
    }

    received++;

    if (received == totalMsgs) {

      var t = process.hrtime(startTime);
      var elapsed = (t[0] * 1e9 + t[1]) / 1000000; // divide by a million to get nano to milli
      console.log('%d milliseconds elapsed.', elapsed);

      t = process.hrtime(dataStartTime);
      elapsed = (t[0] * 1e9 + t[1]) / 1000000; // divide by a million to get nano to milli
      console.log('%d to actually move the data', elapsed);

      process.exit(0);
    }
  });
});

var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:3000');
ws.on('open', function() {
  for (var i = 0; i < totalMsgs; i++) {
    ws.send(data);
  }
});
