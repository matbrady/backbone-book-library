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


Start the App

First open a Terminal tab and run:

		grunt watch:sass

this will watch for `.scss` file changes and compile a new style sheet

then in a new Terminal window, start the node express server with:

		grunt express

Your application should now be served at [localhost:8080](http://localhost:8080)


MongoDB Shell

A Quick Reference to shell commands for reviewing or manipulating a database can be found here [Shell Quick Reference](http://docs.mongodb.org/manual/reference/mongo-shell/)