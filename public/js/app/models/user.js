var app = app || {};

app.UserModel = Backbone.Model.extend ({
    defaults: function () {
        return {
            name: 'Default name',
            color: '888'
        };
    },
    initialize: function () {

    }
});
