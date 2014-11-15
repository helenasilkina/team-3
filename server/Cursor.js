var Swarm = require('swarm');

var Cursor = Swarm.Model.extend('Cursor', {
    defaults: {
        name: 'Cursor 1',
        row: 0,
        column: 0
    }
});

module.exports = Cursor; 