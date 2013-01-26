// Generated by IcedCoffeeScript 1.4.0a
(function() {
  var db, mongo;

  mongo = require('mongodb-wrapper');

  db = mongo.db('localhost', 16961, 'hack');

  db.collection('users');

  db.collection('events');

  db.collection('teams');

  exports.index = function(req, res) {
    return res.render("bootstrap", {
      title: "Team Jam"
    });
  };

  exports.post_login = function(req, res) {
    var search_object, user_object,
      _this = this;
    search_object = {
      username: req.body.username
    };
    user_object = req.body;
    return db.users.findOne(search_object, function(err, doc) {
      if (doc === null) {
        console.log('insert happening');
        return db.users.insert(user_object, function(err, user) {
          return res.json(user[0]._id);
        });
      } else {
        return res.json(doc._id);
      }
    });
  };

  exports.genevent = function(req, res) {
    var event_object,
      _this = this;
    event_object = {
      location: 'Google Campus',
      title: 'GDG Design in Action',
      date: new Date(),
      teams_array: []
    };
    return db.events.insert(event_object, function(err, doc) {
      if (err) {
        throw err;
        return res.json('error!');
      } else {
        console.log('event created');
        console.log(event_object);
        return res.json(event_object);
      }
    });
  };

}).call(this);
