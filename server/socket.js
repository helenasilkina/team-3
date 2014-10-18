var ws = require('ws'),
		db = require('./db');

var server = new ws.Server({port: 3000});

server.on('connection', function(socket) {

	socket.on('message', function(message) {

		var obj = JSON.parse(message);

		console.log(obj);

		if( typeof obj == "object" ) {
			if( obj.method === "create" ) {
				db.create(obj.content, function(id) {
					socket.send(JSON.stringify({ id : id}));
				})
			}
		}

		
	})

	socket.on('close', function() {
		console.log('Close connection');
	})
})