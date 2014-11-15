var app = app || {};

app.MainAppView = Backbone.View.extend({
    initialize: function (options) {
        app.usersCollection = new app.UsersCollection();
        app.cursorsCollection = new app.CursorsCollection();
        app.textModel = new app.TextModel();
        app.editorController = new app.EditorView({
          el: '#editor-field',
          usersCollection: app.usersCollection,
          cursorsCollection: app.cursorsCollection,
          textModel: app.textModel
        });

        var isUpdateWaiting = true;
        var aceEditor = app.editorController.editor.ace;

        // text set
//        isUpdateWaiting = false;
//        app.textModel.set('text', 'text for textarea');
//        isUpdateWaiting = true;


        // text get
//        aceEditor.on('change', function () {
//            if (isUpdateWaiting) {
//                console.log(aceEditor.getValue());
//            }
//        });

        // cursor set
        // app.cursorsCollection.reset(test);

        // cursor get

        // событие по изменению положения курсора
        aceEditor.session.selection.on('changeCursor', function () {
            console.log(app.editorController.editor.getCursor());
        });

        swarm();

        function swarm() {
            var login = prompt('Введите логин');
            var Swarm = require('swarm');
            var Text = require('swarm/lib/Text');
            var swarmHost = new Swarm.Host(login);

            window.text = new Text('TextArea2');

            function listenText() {
                app.textModel.set('text', text.text);
            }

            swarmHost.connect('ws://' + window.location.host.split(':')[0] + ':9999');

            aceEditor.on('change', function () {
                text.set(aceEditor.getValue());
            });

            text.on('init', listenText);

            text.on(function (spec, val, source) {

                console.log('****************START EVENT********************');
                console.log('event: ', spec.op(), val);
                console.log('****************TEXTAREA********************');
                console.log(text);
                console.log(swarmHost);
                listenText();
            });
        }
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

var test = [
    {id: 0, col: 2, row: 0, color: '#ff5500'},
    {id: 1, col: 4, row: 1, color: '#ff0036'},
    {id: 2, col: 1, row: 2, color: '#002aff'}
];

$(document).ready(function () {
    var App = new app.MainAppView();
    // setTimeout(testCursors, 5000);
});

// TESTING DATA!!!!!!!!!!!!!!!

function testCursors() {

    app.cursorsCollection.reset(test);
}

function testText() {
    app.textModel.set('text', 'test string, not so long \ntest string 2 longer longer longer \ntest string 3 the longest string in the document!');
}
