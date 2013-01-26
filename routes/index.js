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
    var search_object, team_assignment, user_object,
      _this = this;
    console.log(req.body);
    search_object = {
      username: req.body.name
    };
    user_object = req.body;
    db.users.findOne(search_object, function(err, doc) {
      if (doc === null) {
        console.log('insert happening');
        return db.users.insert(user_object, function(err, user) {
          team_assignment(user[0]);
          return res.json(user[0]._id);
        });
      } else {
        return res.json(doc._id);
      }
    });
    return team_assignment = function(user) {
      var t, user_type;
      user_type = user.type;
      _this.num_teams = 0;
      if (user_type === 'developer') {
        console.log('dev');
        db.teams.count(function(err, num) {
          return _this.num_teams = num;
        });
        return t = setTimeout(function() {
          var team_object;
          console.log(_this.num_teams);
          if (_this.num_teams === 5) {
            team_object = {
              member_array: {
                member: user
              }
            };
            return db.teams.insert(team_object, function(err, team) {});
          } else {
            return db.find;
          }
        }, 500);
      } else if (user_type === 'other') {
        return console.log('other dude');
      } else if (user_type === 'designer') {
        return console.log('designer');
      }
    };
  };

  exports.get_fake_team = function(req, res) {
    var _this = this;
    return db.teams.findOne({
      name: "team1"
    }, function(err, doc) {
      return res.json(doc);
    });
  };

  exports.get_real_team = function(req, res) {
    return res.json('hello');
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
