//var app = app || {};
//
//
//var EditorModel = Backbone.Model.extend({
//  defaults: function() {
//    return {
//      content: "",
//      flag: true
//    };
//  },
//
//  initialize: function() {
//
//  }
//
//});
//
//var EditorModel = Backbone.Model.extend({
//  defaults: function() {
//    return {
//      name: "Default name",
//      isOnline: false,
//      isReadOnly: false
//    };
//  },
//
//  initialize: function() {
//
//  }
//
//});
//
//var UsersCollection = Backbone.Collection.extend({
//  model: UserModel,
//  initialize: function() {
//
//  }
//});
//
//var EditorCollection = Backbone.Collection.extend({
//  model: EditorModel,
//  initialize: function() {
//
//  }
//});
//
//// VIEWS
//var UsersView = Backbone.View.extend({
//  defaults: function() {
//    return {
//
//    };
//  },
//  events: {
//    'click input': 'chk'
//  },
//  initialize: function (_options) {
//    this.options = _.extend({}, _options, options);
//
//    this.render();
//  },
//
//  render: function() {
//    var template = _.template($('#list-item-template').html(), {items: this.collection.models});
//    this.$el.html(template);
//    return this;
//  }
//
//});
//
//var EditorView = Backbone.View.extend({
//  defaults: function() {
//    return {
//
//    };
//  },
//  events: {
//    'click input': 'chk'
//  },
//  initialize: function (_options) {
//    this.options = _.extend({}, _options, options);
//
//    this.render();
//  },
//
//  render: function() {
//    var template = _.template($('#list-item-template').html(), {items: this.collection.models});
//    this.$el.html(template);
//    return this;
//  }
//
//});