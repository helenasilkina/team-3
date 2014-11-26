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
};

EditorManager.prototype.setCursor = function (row, col) {
    this.ace.moveCursorTo(row, col);
};

EditorManager.prototype.removeMarker = function () {
    this.ace.session.removeMarker(this.marker);
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
        var range = new Range(data[n].row, data[n].col,
            data[n].row, data[n].col + 1);
        this.otherCursors.push(this.ace.session.addMarker(range, 'ace_active-line fake-cursor user-' + data[n].id, 'text'));
    }
};
