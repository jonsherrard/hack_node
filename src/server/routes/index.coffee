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

exports.login = (req, res) ->
	user_object =
		username: "Mark"
		password: "password123"
		type: "dev"
		skills: 'none'
	
	db.users.insert user_object

	test_object =
		hello: 'world'

	res.json test_object