var app = app || {};

app.EditorView = Backbone.View.extend ({
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
        this.userModel = this.options.userModel;

        this.themes = ['xcode', 'twilight'];
        this.syntax = ['text', 'javascript'];

        // event listeners
        this.cursorsCollection.on('add', this.updateCursors, this);
        this.textModel.on('change', this.updateText, this);
        this.usersCollection.on('add', this.addUser, this);

        var _this = this;
        this.render();
    },

    updateUser: function () {
        this.updateCursors();
    },

    addUser: function () {
        var users = '';
        var userModels = this.usersCollection.models;
        for (var i = 0; i < userModels.length; i++) {
            users += '<div class="user"><span class="user__name ace-color-';
            users += userModels[i].get('color') + '">' + userModels[i].get('_id') + '</span></div>';
        }
        $('#users-field').append(users);
    },

    updateText: function () {
        var currCursorPosition = this.editor.getCursor();
        this.editor.dataSet(this.textModel.get('text'));
        this.editor.setCursor(currCursorPosition.row, currCursorPosition.column);
        this.editor.setCursor(currCursorPosition.row, currCursorPosition.column);
    },

    updateCursors: function () {
        this.editor.updateOtherCursors(this.cursorsCollection.models);
    },

    setTheme: function (index) {
        this.editor.ace.setTheme('ace/theme/' + this.themes[index]);
    },

    setSyntax: function (index) {
        this.editor.ace.getSession().setMode('ace/mode/'  + this.syntax[index]);
    },

    render: function () {
        var _this = this;
        var template = _.template($('#editor-template').html());
        this.$el.html(template);

        this.editor = new EditorManager({
            editorId: 'editor'
        });

        ace.config.set('basePath', 'js/ace-additional/');
        this.editor.ace.getSession().setUseWorker(false);

        var themeSwitcher = $('#theme-switcher');
        var syntaxSwitcher = $('#syntax-switcher');

        themeSwitcher.on('change', function () {
            var theme = themeSwitcher.val();
            _this.setTheme(theme);
            $('body').attr('class', '').addClass('ace-' + _this.themes[theme]);
        });
        syntaxSwitcher.on('change', function () {
            _this.setSyntax(syntaxSwitcher.val());
        });

        themeSwitcher.val(0);
        syntaxSwitcher.val(0);

        this.setTheme(0);
        this.setSyntax(0);

        return this;
    }
});
