backbone-book-library
=============

Backbone Book Library Application

working through demo a http://addyosmani.github.io/backbone-fundamentals/#exercise-2-book-library---your-first-restful-backbone.js-app

### FE Build

Grunt adds conviences for processing the project sass and coffeescript. Grunt commands include:

		grunt sass 						// compiles the scss files
		grunt coffee  				// compiles the coffeescript files to a `.temp` directory for now!
		grunt watch						// watches for changes to either the .scss of .coffee files and compiles accordingly
		grunt watch:sass			// watches for changes to .scss files and comiples
		grunt watch:coffee		// watches for changes to .coffee files and compiles


### Start the App

First open a Terminal tab and run:

		grunt watch:sass

this will watch for `.scss` file changes and compile a new style sheet

then in a new Terminal window, start the node express server with:

		grunt express
		// or
		foreman start
		// which just runs the Procfile that executes `web: node server.js` 

Your application should now be served at [localhost:8080](http://localhost:8080)


### Deployment

**Add the Heroku app to Git**

		heroku git:remote -a APP_NAME
		-or-
		git remote add heroku git@heroku.com:APP_NAME.git

**Deploying**

		git push heroku master

if you want to push a specfic local branch run:

		git push heroku BRANCH_NAME:master


### MongoDB Shell

A Quick Reference to shell commands for reviewing or manipulating a database can be found here [Shell Quick Reference](http://docs.mongodb.org/manual/reference/mongo-shell/)

If your dumb like me and need reminded of basic mongo terminal functions

		mat[backbone-book_library]-> mongo
		MongoDB shell version: 2.4.5
		connecting to: test
		Server has startup warnings: 
		Fri Aug  9 15:32:53.215 [initandlisten] 
		Fri Aug  9 15:32:53.215 [initandlisten] ** WARNING: soft rlimits too low. Number of files is 256, should be at least 1000
		> show dbs
		library_database	0.203125GB
		local	0.078125GB
		test	0.203125GB
		we	0.203125GB
		> use library_database
		switched to db library_database
		> show collections
		books
		system.indexes
		> db.books.find();
		{ "_id" : ObjectId("5203f89cc1fe687437000001"), "__v" : 0 }
		{ "_id" : ObjectId("5203f8ed61a9618a37000001"), "__v" : 0 }
		{ "_id" : ObjectId("5203fc4a5f7448eb37000001"), "__v" : 0 }
		{ "_id" : ObjectId("5203fc769ff201ee37000001"), "__v" : 0 }
		{ "_id" : ObjectId("5203fc8e88e46bf537000001"), "__v" : 0 }
		{ "title" : "mat", "_id" : ObjectId("520401b80d90e17238000001"), "__v" : 0 }
		{ "title" : "JavaScript the good parts", "author" : "Douglas Crockford", "releaseDate" : ISODate("2008-05-01T04:00:00Z"), "_id" : ObjectId("5205434d520b37e91c000001"), "__v" : 0 }
		> 
