var listen = require('./common').listen;
var eioc = require('engine.io-client');

var startTime = process.hrtime();
var dataStartTime;
var totalMsgs = 1000;

var mode = process.argv[2];
mode = mode || 'string';
var data = (mode == 'string') ? 'trololol' : new Buffer('trololol', 'utf-8');

var opts = { allowUpgrades: false, transports: ['polling'] };
var engine = listen(opts, function(port) {
  var socket = new eioc.Socket('ws://localhost:%d'.s(port), { transports: ['polling'] });

  var receivedMsgs = 1;
  engine.on('connection', function(socket) {
    socket.on('message', function(msg) {
      if (receivedMsgs == 1) {
        dataStartTime = process.hrtime();
      }

      if (receivedMsgs == totalMsgs) {
        var decimalPlaces = 3;

        var t = process.hrtime(startTime);
        var elapsed = (t[0] * 1e9 + t[1]) / 1000000; // divide by a million to get nano to milli
        console.log('%d milliseconds elapsed.', elapsed);

        t = process.hrtime(dataStartTime);
        elapsed = (t[0] * 1e9 + t[1]) / 1000000; // divide by a million to get nano to milli
        console.log('%d to actually move the data', elapsed);

        process.exit(1);
      }
      receivedMsgs++;
    });
  });

  socket.on('open', function() {
    for (var i = 0; i < totalMsgs; i++) {
      socket.send(data);
    }
  });
});
