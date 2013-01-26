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
    var insert_user, team_assignment, user,
      _this = this;
    insert_user = function(req) {
      var search_object, user_object;
      search_object = {
        username: req.body.username
      };
      user_object = req.body;
      return db.users.findOne(search_object, function(err, doc) {
        console.log(doc);
        if (err && (function() {
          throw err;
        })()) {} else if (doc === null) {
          console.log('insert happening');
          return db.users.insert(user_object, function(err, user) {
            if (err) {
              throw err;
              return res.json({
                error: 'DB error'
              });
            } else {
              return user;
            }
          });
        } else {
          return user;
        }
      });
    };
    team_assignment = function(user) {
      var num_teams, team_object, user_type;
      console.log('------team team_assignment user');
      console.log(user);
      user_type = user.type;
      switch (user_type) {
        case 'developer':
          num_teams = db.teams.count();
          if (num_teams = 0) {
            team_object = {};
            return db.teams.insert(team_object, function(err, team) {
              if (err & (function() {
                throw err;
              })()) {} else {
                return db.teams.update({
                  _id: team._id
                }, {
                  $push: {
                    member_array: user_object
                  }
                });
              }
            });
          }
          break;
        case 'designer':
          return console.log('designer');
        case 'other':
          return console.log('designer');
      }
    };
    user = insert_user(req);
    console.log('after insert');
    console.log(user);
    console.log('before team');
    team_assignment(user);
    return res.json(user._id);
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
