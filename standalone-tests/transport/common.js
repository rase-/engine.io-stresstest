/**
 * Module dependencies.
 */

var eio = require('engine.io');

/**
 * Listen shortcut that fires a callback on an epheemal port.
 */

exports.listen = function (opts, fn) {
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }

  var e = eio.listen(null, opts, function () {
    fn(e.httpServer.address().port);
  });

  return e;
};

/**
 * Sprintf util.
 */

require('s').extend();
