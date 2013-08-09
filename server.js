// Module dependencies.
var application_root = __dirname,
  express = require( 'express' ), //Web framework
  path = require( 'path' ), //Utilities for dealing with file paths
  mongoose = require( 'mongoose',
  _ = require( 'underscore' )); //MongoDB integration

//Create server
var app = express();

// Configure server
app.configure( function() {
  //parses request body and populates request.body
  app.use( express.bodyParser() );

  //checks request.body for HTTP method overrides
  app.use( express.methodOverride() );

  //perform route lookup based on url and HTTP method
  app.use( app.router );

  //Where to serve static content
  app.use( express.static( path.join( application_root, 'public') ) );

  //Show all errors in development
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});


//Start server
var port = process.env.PORT || 8080;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});


// Routes
app.get( '/api/books', function( request, response) {
  return BookModel.find( function( err, books ) {
    if (!err) {
      return response.send( books );
    }
    else {
      return console.log( err );
    }
  });
});

// Insert a new book
app.post( '/api/books', function( request, response) {

  var required = [ 'title', 'author', 'releaseDate' ];
  var data = request.body;

  if ( _.isEmpty( data ) ) {
    console.log('bad request');
  }
  else {
    var book = new BookModel({
      title: request.body.title,
      author: request.body.author,
      releaseDate: request.body.releaseDate
    });

    console.log( book );

    book.save( function( err ) {
      if ( !err ) {
        return console.log('Book Created');
      }
      else {
        return console.log( err );
      }
    });
    return response.send( book );
  }
});


// // Connect to database
// mongoose.connect( 'mongodb://localhost/library_database' );

// // Schemas
// var Book = new mongoose.Schema({
//   title: String,
//   author: String,
//   releaseDate: Date
// });

// // Models
// var BookModel = mongoose.model( 'Book', Book );
