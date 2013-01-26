#
# * GET home page.
# 

mongo = require 'mongodb-wrapper'
db = mongo.db 'localhost', 16961, 'hack'
db.collection 'users'
db.collection 'events'



exports.index = (req, res) ->
  res.render "bootstrap",
      title: "Date Find"

exports.post_login = (req, res) ->

	console.log req.body.username
	search_object =
		username: req.body.username
	user_object = req.body
	db.users.findOne search_object, (err, doc) =>
		console.log doc
		if err && throw err
		else if doc is null
			console.log 'insert happening'
			db.users.insert user_object, (err, doc) =>
				if err
					throw err
					res.json(error: 'DB error')
				else
					res.json doc
		else
			res.json doc

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



