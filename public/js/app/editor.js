var site_app = site_app || {};

var _ref;
var Range  = ((_ref = ace.require) !== null ? _ref : require)('ace/range').Range;

var Editor = function (_options) {

    var options = {
        editor: null
    };
    this.ace = ace.edit('editor');
    this.ace.session.setMode('ace/mode/html');

    this.otherCursors = [];

    var _this = this;

};

Editor.prototype.setCursor = function (row, col) {
    this.ace.moveCursorTo(row, col);
};

Editor.prototype.setOtherCursor = function (range, id) {
    this.marker = this.ace.session.addMarker(range, 'ace_active-line', 'text');
};

Editor.prototype.addMarker = function () {
    var range = new Range(2, 0, 2, 1);
    this.marker = this.ace.session.addMarker(range, 'ace_active-line user-1', 'text');
};

Editor.prototype.removeMarker = function () {
    this.ace.session.removeMarker(this.marker);
};

Editor.prototype.getCursor = function () {
    return this.ace.getCursorPosition();
};

Editor.prototype.dataReplace = function (coords, data) {
    var range = new Range(coords.start.row, coords.start.col, coords.end.row, coords.end.col);
    this.ace.session.replace(range, data);
};

Editor.prototype.dataSet = function (data) {
    this.ace.session.setValue(data);
};

Editor.prototype.updateOtherCursors = function (data) {
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
