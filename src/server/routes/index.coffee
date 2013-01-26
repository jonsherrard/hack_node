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
	user_object =
		username: req.body.username
	db.users.findOne user_object, (err, doc) =>
		if err && throw err
		else if doc is undefined
			console.log 'insert happening'
			db.users.insert user_object, (err, doc) =>
				if err
					throw err
					res.json(error: 'DB error')
				else
					'logged in'
					res.json(logged_in: true)
		else
			console.log 'update happening'
			db.users.update
				username:  user_object.username
			,
				$set:
					user_object

	res.json user_object