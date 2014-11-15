var express = require('express');
var path = require('path');
var app = express();
var browserify  = require('connect-browserify');

app.use(express.static('dist'));

app.get('/', function(req, res){
    res.sendFile(path.resolve('public/index.html'));
});

app.get('/editor', function(req, res){
    res.sendFile(path.resolve('dist/editor.html'));
});

app.get('/doc/:id', function(req, res){
    res.sendFile(path.resolve('public/doc.html'));
});

app.get('/dist/bundle.js',
    browserify('./dist/js/app', {
        debug: true,
        watch: true
    }));

module.exports = {
    run: function(port) {
        app.listen(port);
    }
}
