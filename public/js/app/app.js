var app = app || {};

app.MainAppView = Backbone.View.extend({
    initialize: function (options) {
        app.usersCollection = new app.UsersCollection();
        app.cursorsCollection = new app.CursorsCollection();
        app.textModel = new app.TextModel();
        app.userModel = new app.UserModel();
        app.editorController = new app.EditorView({
            el: '#editor-field',
            usersCollection:  app.usersCollection,
            cursorsCollection: app.cursorsCollection,
            textModel: app.textModel,
            userModel: app.userModel
        });

        this.swarmStart();
        this.textSyncStart();
    },

    getUsername: function () {
        var name = prompt('Введите логин');
        if (/\w/.test(name)) {
            return name;
        } else {
            return getLogin();
        }
    },

    getRandomColor: function () {
        var colorArray = ['da0', 'ad0', '0ad', 'd00', '0d0', '00d', '888', '900', '090', '009'];
        return colorArray[Math.floor(Math.random() * 10)];
    },

    swarmStart: function () {
        var username = this.getUsername();
        var Swarm = require('swarm');
        var swarmHost = new Swarm.Host(username);
        swarmHost.connect('ws://' + window.location.host.split(':')[0] + ':9999');
        $('.profile__name').text(username);

    },

    textSyncStart: function () {
        var aceEditor = app.editorController.editor.ace;
        var isUpdateWaiting = true;
        var Text = require('swarm/lib/Text');
        var syncText = new Text('TextArea2');

        var username = $('.profile__name').text();
        var randomColor = this.getRandomColor();
        var swarmModel = require('swarm/lib/Model');
        var userInfo = new swarmModel(username);
        var swarmCollection = require('swarm/lib/Vector');
        var cursorsCollection = new swarmCollection('list');

        function updateEditorText() {
            isUpdateWaiting = false;
            app.textModel.set('text', syncText.text);
            isUpdateWaiting = true;
        }

        function updateCursorCollection() {
            setInterval(function () {
                app.cursorsCollection.reset();
                for (var i = 0; i < cursorsCollection.objects.length; i++) {
                    if (cursorsCollection.objects[i]._id !== username) {
                        app.cursorsCollection.add(cursorsCollection.objects[i]);
                    }
                }
            }, 1000);
        }

        aceEditor.on('change', function () {
            if (isUpdateWaiting) {
                syncText.set(aceEditor.getValue());
            }
        });

        aceEditor.session.selection.on('changeCursor', function () {
            for (var i = 0; i < cursorsCollection.objects.length; i++) {
                if (cursorsCollection.objects[i]._id == username) {
                    cursorsCollection.objects[i].set(app.editorController.editor.getCursor());
                }
            }
        });

        syncText.on('init', updateEditorText);

        syncText.on(function (spec, val, source) {
            updateEditorText();
        });

        userInfo.on('init', function () {
            setTimeout(function () {
                var isUserExist = -1;
                for (var i = 0; i < cursorsCollection.objects.length; i++) {
                    if (cursorsCollection.objects[i]._id !== username) {
                        app.usersCollection.add(cursorsCollection.objects[i]);
                        app.cursorsCollection.add(cursorsCollection.objects[i]);
                    } else {
                        isUserExist = i;
                    }
                }
                if (isUserExist > -1) {
                    cursorsCollection.objects[isUserExist].set(app.editorController.editor.getCursor());
                } else {
                    userInfo.set({color: randomColor});
                    userInfo.set(app.editorController.editor.getCursor());
                    cursorsCollection.addObject(userInfo);
                }
                updateCursorCollection();
            }, 1000);
        });
    }
});

$(document).ready(function () {
    var App = new app.MainAppView();
});
