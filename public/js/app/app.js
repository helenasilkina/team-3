var app = app || {};

app.MainAppView = Backbone.View.extend({
    initialize: function (options) {
            app.usersCollection = new app.UsersCollection();
        app.cursorsCollection = new app.CursorsCollection();
        app.textModel = new app.TextModel();
        app.editor = new app.EditorView({
          el: '#editor-field',
          usersCollection: app.usersCollection,
          cursorsCollection: app.cursorsCollection,
          textModel: app.textModel
        });
    }
});

var testUsers =  [
    {id: '0', name: 'User 0', isOnline: false},
    {id: '1', name: 'User 1', isOnline: false},
    {id: '2', name: 'User 2', isOnline: true},
    {id: '3', name: 'User 3', isOnline: false},
    {id: '4', name: 'User 4', isOnline: false},
    {id: '5', name: 'User 5', isOnline: true},
    {id: '6', name: 'User 6', isOnline: false}
];

$(document).ready(function () {
    var App = new app.MainAppView();
    swarm();
    // setTimeout(testCursors, 5000);
});

function swarm() {
    var login = prompt('Введите логин');
    var Swarm = require('swarm');
    var Text = require('swarm/lib/Text');
    var swarmHost = new Swarm.Host(login);

    window.text = new Text('TextArea2');

    function listenText() {
        app.textModel.set('text', text.text);
    }

    swarmHost.connect('ws://localhost:9999');

    // //Set
    // textArea.oninput = function() {
    //     text.set(this.value);
    // }

    text.on('init', listenText);

    text.on(function(spec, val, source) {

        console.log('****************START EVENT********************');
        console.log('event: ', spec.op(), val);
        console.log('****************TEXTAREA********************');
        console.log(text);
        console.log(swarmHost);
        listenText();
    })
}

// TESTING DATA!!!!!!!!!!!!!!!

function testCursors() {
    var test = [
        {id: 0, col: 2, row: 0, color: '#ff5500'},
        {id: 1, col: 4, row: 1, color: '#ff0036'},
        {id: 2, col: 1, row: 2, color: '#002aff'}
    ];

    app.cursorsCollection.reset(test);
}

function testText() {
    app.textModel.set('text', 'test string, not so long \ntest string 2 longer longer longer \ntest string 3 the longest string in the document!');
}
