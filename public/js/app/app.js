var app = app || {};

var EditorModel = Backbone.Model.extend ({
    defaults: function () {
        return {
            content: '',
            flag: true
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

var EditorCollection = Backbone.Collection.extend ({
    model: EditorModel,
    initialize: function () {
    }
});

// VIEWS
var UsersView = Backbone.View.extend ({
        events: {
        'click input': 'chk'
    },
    initialize: function (_options) {
    // this.options = _.extend ({}, _options, options);
        this.render();
    },

    render: function () {
        // var template = _.template($('#list-item-template').html(), {items: this.collection.models});
        // this.$el.html(template);
        return this;
    }
});

var EditorView = Backbone.View.extend ({
    defaults: function () {
        return {

        };
    },
    events: {
        'click input': 'chk'
    },
    initialize: function (_options) {
        this.options = _.extend ({}, _options, options);
        this.render();
    },

    render: function () {
        // var template = _.template($('#list-item-template').html(), {items: this.collection.models});
        // this.$el.html(template);
        return this;
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

var usersCollection = new UsersCollection();
usersCollection.add(testUsers);

console.log(usersCollection);
