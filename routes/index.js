// Generated by IcedCoffeeScript 1.4.0a
(function() {
  var db, mongo;

  mongo = require('mongodb-wrapper');

  db = mongo.db('localhost', 16961, 'hack');

  db.collection('users');

  db.collection('events');

  exports.index = function(req, res) {
    return res.render("bootstrap", {
      title: "Date Find"
    });
  };

  exports.login = function(req, res) {
    var test_object;
    test_object = {
      hello: 'world'
    };
    return res.json(test_object);
  };

}).call(this);
