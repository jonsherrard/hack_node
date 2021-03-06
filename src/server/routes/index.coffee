#
# * GET home page.
# 
gcm = require 'node-gcm'
mongo = require 'mongodb-wrapper'
db = mongo.db 'localhost', 16961, 'hack'
db.collection 'users'
db.collection 'events'
db.collection 'teams'



exports.index = (req, res) ->
 	res.render "bootstrap",
     	title: "Team Jam"

exports.post_login = (req, res) ->
	console.log req.body
	search_object =
		username: req.body.name
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
				if @num_teams is 5
					team_object =
						member_array:
							member: user
					db.teams.insert team_object, (err, team) =>
				else
					db.find

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

exports.gcm = (req, res) ->
	message = new gcm.Message()
	sender = new gcm.Sender('AIzaSyAoB2P7I3KdoxPJL7RVCPrWjYWwNFn_D88')
	message.addData('TeamName', 'your team!')
	registration_ids = []
	registration_ids.push 'APA91bFf66AuVgmkoCe8_q6vZ56pb9wCrsP8bqANgg9J-JtYU_PThP2V2u3uIhIVmqyrdeDpkl5xx8WpGs0Zmm1lIcJu8VECNrhHRr04e9vq7u7mxs90znddN7cUXhc6S28ogMiD16RgLOuQS35WxmBNfyvm-PV40X7A92Z0QP1rizUcqF4LmdA'
	sender.send message, registration_ids, 4, (err, result) ->
		res.send result






