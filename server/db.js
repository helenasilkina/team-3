// global data base
var db = {};

// create default Id
var defaultId = 0;

function generateId() {
    return ++defaultId;
}

module.exports = {
    create: function (document, callback) {
        //generate id
        var id = generateId();

        //add new document
        db[id] = document;
        callback(id);
    },
    get: function (id, callback) {
        callback(db[id]);
    },
    delete: function (id) {
        delete db[id];
    }
};

