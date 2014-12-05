var app = app || {};

app.CursorModel = Backbone.Model.extend ({
    defaults: function () {
        return {
            _id: null,
            row: null,
            column: null,
            color: '888'
        };
    },

    initialize: function () {

    }
});
