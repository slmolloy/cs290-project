var _ = require('lodash');
var ws = require('ws');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var clients = [];

exports.connect = function(server) {
  var wss = new ws.Server({server: server});
  wss.on('connection', function(ws) {
    clients.push(ws);
    exports.broadcast('new client joined');
    ws.on('close', function() {
      _.remove(clients, ws);
    });
    ws.on('message', function(message) {
      var payload = JSON.parse(message);
      var tag = 'ws:' + payload.topic;
      eventEmitter.emit('ws:' + payload.topic, payload.data);
    });
  });
};

exports.broadcast = function(topic, data) {
  var json = JSON.stringify({topic: topic, data: data});
  clients.forEach(function(client) {
    client.send(json);
  });
};

exports.eventEmitter = eventEmitter;
