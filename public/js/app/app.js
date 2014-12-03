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
        var colorArray = ['300', '030', '003', '600', '060', '006', '888', '900', '090', '009'];
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

        function setProperty(username, property) {
            var objects = cursorsCollection.objects;
            for (var i = 0; i < objects.length; i++) {
                if (objects[i]._id == username) {
                    objects[i].set(property);
                }
            }
        }

        function updateEditorText() {
            isUpdateWaiting = false;
            app.textModel.set('text', syncText.text);
            isUpdateWaiting = true;
        }

        aceEditor.on('change', function () {
            if (isUpdateWaiting) {
                syncText.set(aceEditor.getValue());
            }
        });

        aceEditor.on('blur', function () {
            userInfo.set({online: false});
        });

        // событие по изменению положения курсора
        aceEditor.session.selection.on('changeCursor', function () {
            app.userModel.set(app.editorController.editor.getCursor());
            setProperty(username, {online: true});
            setProperty(username, app.editorController.editor.getCursor());
        });

        syncText.on('init', updateEditorText);

        syncText.on(function (spec, val, source) {
            updateEditorText();
        });

        userInfo.on('init', function () {
            userInfo.set({color: randomColor, online: true});
            var isUserExist = false;

            for (var i = 0; i < cursorsCollection.objects.length; i++) {
                if (cursorsCollection.objects[i]._id == username) {
                    isUserExist = true;
                }
            }

            if (isUserExist) {
                setProperty(username, {online: true});
            } else {
                cursorsCollection.addObject(userInfo);
            }
            app.usersCollection.models = cursorsCollection.objects;
        });

        cursorsCollection.on(function (spec, val, source) {
            app.cursorsCollection.models = [];
            app.cursorsCollection.models = cursorsCollection.objects;
        });
    }
});

$(document).ready(function () {
    var App = new app.MainAppView();
});
