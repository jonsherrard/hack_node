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

  exports.post_login = function(req, res) {
    var search_object, user_object,
      _this = this;
    console.log(req.body.username);
    search_object = {
      username: req.body.username
    };
    user_object = req.body;
    db.users.findOne(search_object, function(err, doc) {
      console.log(doc);
      if (err && (function() {
        throw err;
      })()) {} else if (doc === null) {
        console.log('insert happening');
        return db.users.insert(user_object, function(err, doc) {
          if (err) {
            throw err;
            return res.json({
              error: 'DB error'
            });
          } else {
            'logged in';
            return res.json({
              logged_in: true
            });
          }
        });
      } else {
        return res.json({
          loggin_in: true
        });
      }
    });
    return res.json(user_object);
  };

}).call(this);
