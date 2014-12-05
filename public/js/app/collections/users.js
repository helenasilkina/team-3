var app = app || {};

app.UsersCollection = Backbone.Collection.extend ({
    model: app.UserModel,
    initialize: function () {
    },
    add: function (model) {

        var duplicates = this.filter(function (_model) {
            return _model.get('_id') === model.get('_id');
        });

        if (!_(duplicates).isEmpty) {
            this.remove(duplicates);
        }

        Backbone.Collection.prototype.add.call(this, model);
    }
});
