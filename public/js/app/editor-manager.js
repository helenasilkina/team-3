var _ref;
var Range  = ((_ref = ace.require) !== null ? _ref : require)('ace/range').Range;

var EditorManager = function (_options) {
    this.options = jQuery.extend(true, {
        editorId: null
    }, _options);

    this.ace = ace.edit(this.options.editorId);
    this.ace.session.setMode('ace/mode/html');

    this.stylesTag = jQuery('<style></style>');
    this.stylesTag.appendTo('body');

    this.otherCursors = [];
    this.user = $('.profile__name').text();
};

EditorManager.prototype.setCursor = function (row, col) {
    this.ace.moveCursorTo(row, col);
};

EditorManager.prototype.removeMarker = function () {
    this.ace.session.removeMarker(this.marker);
};

EditorManager.prototype.addMarker = function (range, classtext, text) {
    this.ace.session.addMarker(range, classtext, text);
};

EditorManager.prototype.getCursor = function () {
    return this.ace.getCursorPosition();
};

EditorManager.prototype.dataReplace = function (coords, data) {
    var range = new Range(coords.start.row, coords.start.col, coords.end.row, coords.end.col);
    this.ace.session.replace(range, data);
};

EditorManager.prototype.dataSet = function (data) {
    this.ace.session.setValue(data);
};

EditorManager.prototype.updateOtherCursors = function (data) {
    for (var i = 0; i < this.otherCursors.length; i++) {
        this.ace.session.removeMarker(this.otherCursors[i]);
    }

    this.otherCursors = [];

    for (var n = 0; n < data.length; n++) {
        if (data[n].online === true && data[n]._id != this.user) {
            var range = new Range(data[n].row, data[n].column, data[n].row, data[n].column + 1);
            var textClass = 'ace_active-line user-' + data[n]._id + ' ace-color-' + data[n].color;
            this.otherCursors.push(this.ace.session.addMarker(range, textClass, 'text'));
        }
    }
};
