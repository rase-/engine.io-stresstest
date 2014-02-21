// this is a test server to support tests which make requests

var transport = process.argv[2];
transport = transport || 'polling';

var express = require('express');
var app = express();
var join = require('path').join;
var http = require('http').Server(app);
var server = require('engine.io').attach(http, { transports: [transport] });

http.listen(3000);

var startTime = process.hrtime();
var dataStartTime;
msgsReceived = 0;
totalMsgs = 10000;
server.on('connection', function(socket){
  socket.on('message', function (data) {
    if (msgsReceived == 0) {
      dataStartTime = process.hrtime();
    }

    msgsReceived++;

    if (msgsReceived == totalMsgs) {
      var t = process.hrtime(startTime);
      var elapsed = (t[0] * 1e9 + t[1]) / 1000000; // divide by a million to get nano to milli
      console.log('%d milliseconds elapsed.', elapsed);

      t = process.hrtime(dataStartTime);
      elapsed = (t[0] * 1e9 + t[1]) / 1000000; // divide by a million to get nano to milli
      console.log('%d to actually move the data', elapsed);

      socket.close();
      process.exit();
    }
  });
});
