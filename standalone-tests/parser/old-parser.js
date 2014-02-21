var parser = require('engine.io-parser');

console.log('Testing encoding and decoding of a single packet');
var startTime = process.hrtime();
for  (var i = 0; i < 1000; i++) {
  parser.decodePacket(parser.encodePacket({ type: 'message', data: 'trololol' }));
}

var t = process.hrtime(startTime);
var elapsed = (t[0] * 1e9 + t[1]) / 1000000; // divide by a million to get nano to milli
console.log('%d milliseconds elapsed.', elapsed);

console.log('Testing encoding and decoding of a payload');
var packet = { type: 'message', data: 'trololol' };
var ary = new Array(1000);
for (var i = 0; i < 1000; i++) {
  ary[i] = packet;
}

startTime = process.hrtime();
parser.decodePayload(parser.encodePayload(ary), function(p, i, tot) {
});

t = process.hrtime(startTime);
elapsed = (t[0] * 1e9 + t[1]) / 1000000;
console.log('%d milliseconds elapsed', elapsed);
