function SocketWrap(url, port) {

	var socket = new WebSocket('ws://' + url + ':' + port);

	this.create = function(data) {
		var object = {
			"content": data,
			"method": "create"
		}
		socket.send(JSON.stringify(object));
	}

	this.on = function(callback) {
		socket.onmessage = callback
	}
}