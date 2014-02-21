var listen = require('./common').listen;
var eioc = require('engine.io-client');

var startTime = process.hrtime();
var dataStartTime;
var totalMsgs = 1000;

var socket = new eioc.Socket('ws://localhost:3000', { transports: ['polling'] });
socket.on('open', function() {
  var ary = new Int8Array(15);
  for (var i = 0; i < 15; i++) {
    ary[i] = i;
  }

  for (var i = 0; i < totalMsgs; i++) {
    socket.send(ary);
  }
});
