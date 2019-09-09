
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
  const constants = require('../constants');
  const chalk = require('chalk');

/*
* Export named fuction to connect with DB
*/
exports.connectToDB = function () {
  // Use connect method to connect to the Server
  MongoClient.connect(constants.DB_URL, function(err, db) {
  assert.equal(null, err);
  console.log(chalk.cyanBright("Connected With server"));
  db.close();
  });
}

/*
* ------------CRUD--------------------
*/
exports.createRecord = function () {
  // Use connect method to connect to the Server
  MongoClient.connect(constants.DB_URL, function(err, db){
    assert.equal(null, err);
    console.log(chalk.cyanBright("Performing CRUD Operation"));

    insertDocuments(db, function() {
      updateDocument(db, function() {
        deleteDocument(db, function() {
          db.close();
        });
      });
    });
  });
}
//------------------------CREATE-------------
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');

  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}],
     function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log(chalk.cyanBright("Inserted 3 documents into the document collection"));
      callback(result);
  });
}

//-------------READ--------------------
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    assert.equal(2, docs.length);
    console.log(chalk.cyanBright("Found the following records"));
    console.dir(docs);
    callback(docs);
  });
}
//---------------UPDATE---------------------
var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne(
      { a : 2 } ,
      { $set: { b : 1 } },
     function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log(chalk.cyanBright("Updated the document with the field a equal to 2"));
        callback(result);
  });
}

//-------------DELETE----------------------
var deleteDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.deleteOne({ a : 3 }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log(chalk.cyanBright("Removed the document with the field a equal to 3"));
        callback(result);
     });
  }
