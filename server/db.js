var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

module.exports = {

    create: function(cnt, db, callback) {
        var collection = db.collection('documents');
        collection.insert(
            {content : cnt}, function(err, result) {
            callback(result[0]);
            }
        );
    },

    get : function(id, db, callback) {
        var collection = db.collection('documents');
        collection.findOne({ _id : ObjectId(id) }, function(err, result) {
            callback(result);
        });
    }

};
