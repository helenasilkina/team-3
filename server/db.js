//
var db = [];

function generateId() {

}

module.exports = {
    create: function (document, callback) {
        //generate id
        var id = generateId();

        //
        db.push({'id': id, 'document': document});
        return id;
    },
    read: function (id) {
        return document;
    },
    update: function (id) {},
    delete: function (id) {}
};