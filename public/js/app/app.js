var app = app || {};

// MODELS
var CursorModel = Backbone.Model.extend ({
    defaults: function () {
        return {
            id: null,
            row: null,
            col: null
        };
    },

    initialize: function () {
        console.log('init');
    }
});

var TextModel = Backbone.Model.extend ({
    defaults: function () {
        return {
          text: 'test model string'
        };
    },

    initialize: function () {
        console.log('init');
    }
});

var UserModel = Backbone.Model.extend ({
    defaults: function () {
        return {
            id: null,
            name: 'Default name',
            isOnline: false
        };
    },
    initialize: function () {

    }
});

var UsersCollection = Backbone.Collection.extend ({
    model: UserModel,
    initialize: function () {
    }
});

var CursorsCollection = Backbone.Collection.extend ({
    model: CursorModel,
    initialize: function () {
    }
});

// VIEWS
var UsersView = Backbone.View.extend ({
    options: {
      collection: null
    },

    events: {
      'click input': 'chk'
    },

    initialize: function (_options) {
        // this.options = _.extend ({}, _options, options);
        this.render();
    },

    render: function () {
        var template = _.template($('#user-template').html(), {items: this.collection.models});
        // this.$el.html(template);
        return this;
    }
});

var EditorView = Backbone.View.extend ({
    options: {
        prop: 'test original'
    },
    events: {
        'click input': 'chk'
    },
    initialize: function (_options) {
        this.options = _.extend ({}, this.options, _options);
        this.usersCollection = this.options.usersCollection;
        this.cursorsCollection = this.options.cursorsCollection;
        this.textModel = this.options.textModel;

        // event listeners
        this.cursorsCollection.on('reset', this.updateCursors, this);
        this.textModel.on('change', this.updateText, this);

        this.render();
    },

    updateText: function () {
        this.editor.dataSet(this.textModel.get('text'));
    },

    updateCursors: function () {
        var data = JSON.parse(JSON.stringify(this.cursorsCollection.models));
        this.editor.updateOtherCursors(data);
    },

    onlineToggle: function (isOnline) { // 0

    },

    render: function () {
        var template = _.template($('#editor-template').html());
        this.$el.html(template);

        this.editor = new Editor({
            editorId: 'editor'
        });
        return this;
    }
});

var MainAppView = Backbone.View.extend({
    initialize: function (options) {
        app.usersCollection = new UsersCollection();
        app.cursorsCollection = new CursorsCollection();
        app.textModel = new TextModel();
        app.editor = new EditorView({
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
    var App = new MainAppView();
    // setTimeout(testCursors, 5000);
});

// TESTING DATA!!!!!!!!!!!!!!!

function testCursors() {
    var test = [
        {id: 0, col: 2, row: 0},
        {id: 1, col: 4, row: 1},
        {id: 2, col: 1, row: 2}
    ];

    app.cursorsCollection.reset(test);
}

function testText() {
    app.textModel.set('text', 'test string, not so long \ntest string 2 longer longer longer \ntest string 3 the longest string in the document!');
}
