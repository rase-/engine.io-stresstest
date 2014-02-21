var eioc = require('engine.io-client');

var totalMsgs = 10000;

var socket = new eioc.Socket('ws://localhost:3000', { transports: ['websocket'] });
socket.on('open', function() {
  for (var i = 0; i < totalMsgs; i++) {
    socket.send('trololol');
  }
});
