var app = app || {};

app.UserModel = Backbone.Model.extend ({
    defaults: function () {
        return {
            id: null,
            name: 'Default name',
            isOnline: false,
            color: '#000'
        };
    },
    initialize: function () {

    }
});
