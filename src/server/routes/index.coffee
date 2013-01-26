#
# * GET home page.
# 

mongo = require 'mongodb-wrapper'
db = mongo.db 'localhost', 16961, 'hack'
db.collection 'users'
db.collection 'events'
db.collection 'teams'



exports.index = (req, res) ->
  res.render "bootstrap",
      title: "Team Jam"

exports.post_login = (req, res) ->
	insert_user = (req) ->
		search_object =
			username: req.body.username
		user_object = req.body
		db.users.findOne search_object, (err, doc) =>
			console.log doc
			if err && throw err
			else if doc is null
				console.log 'insert happening'
				db.users.insert user_object, (err, user) =>
					if err
						throw err
						res.json(error: 'DB error')
					else
						return user
			else
				return user

	user = insert_user()

	team_assignment = (user)

	user_type = user.type
	switch user_type
		when 'developer'
			num_teams = db.teams.count()
			if num_teams = 0
				team_object = {}
				db.teams.insert team_object, (err, team) =>
					if err & throw err
					else
						db.teams.update
							_id: team._id
						,
							$push:
								member_array: user_object
		when 'designer'
		when 'other'

	res.json user._id



exports.genevent = (req, res) ->
	event_object =
		location: 'Google Campus'
		title: 'GDG Design in Action'
		date: new Date()
		teams_array: []
	db.events.insert event_object, (err, doc) =>
			if err 
				throw err
				res.json 'error!'
			else
				console.log 'event created'
				console.log event_object
				res.json event_object



