var socket = require('./socket');
var server = require('./server');
var swarm_server = require('./swarm_server');
server.run(1337);
socket.run();
swarm_server.run();