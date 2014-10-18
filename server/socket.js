var ws = require('ws'),
		db = require('./db');

function run() {
	var server = new ws.Server({port: 3000});

	server.on('connection', function(socket) {

		socket.on('message', function(message) {

			var obj = JSON.parse(message),
					data = null;

			if( typeof obj == 'object' ) {
				if( obj.method === 'create' ) {
					db.create(obj.content, function(id) {
						var obj = {
							type: 'createOk',
							data: 'Success',
							eventName: 'success',
							id:id
						}
						socket.send(JSON.stringify(obj));
					})
				}
				if( obj.method === 'get') {
					db.get(obj.id, function(data) {
						var object = {
							type: 'get',
							data: data,
							id: obj.id
						}
						console.log(obj);
						socket.send(JSON.stringify(object));
					})
				}
			}
			db.get(data, function(text) {
				console.log(text);
			})
		})

		socket.on('close', function() {
			console.log('Close connection');
		})
	})
}

module.exports = {
	run: run
}