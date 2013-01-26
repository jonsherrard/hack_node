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



	user_object = req.body
	
	db.users.update 
		username: req.body.username
	,	
		$set:
			user_object
	, 
		upsert: true

	res.json user_object