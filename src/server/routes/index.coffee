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
	search_object =
		username: req.body.username
	user_object = req.body
	db.users.findOne search_object, (err, doc) =>
		if doc is null
			console.log 'insert happening'
			db.users.insert user_object, (err, user) =>
				team_assignment user[0]
				res.json user[0]._id
		else
			res.json doc._id

	team_assignment = (user) =>
		user_type = user.type
		@num_teams = 0
		if user_type is 'developer'
			console.log 'dev'
			db.teams.count (err, num) =>
				@num_teams = num
			t = setTimeout(=>
				console.log @num_teams
				if @num_teams is 3
					team_object = {}
					db.teams.insert team_object, (err, team) =>
						console.log team
						db.teams.update
							_id: team._id
						,
							$push:
								member_array:
									member: user
			, 500)

		else if user_type is 'other'
			console.log 'other dude'
		else if user_type is 'designer'
			console.log 'designer'


exports.get_fake_team = (req, res) ->
	db.teams.findOne {name: "team1"}, (err, doc) =>
		res.json doc

exports.get_real_team = (req, res) ->
	res.json 'hello'

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



