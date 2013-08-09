// Module dependencies.
var application_root = __dirname,
    express   = require('express'), //Web framework
    path      = require('path'), //Utilities for dealing with file paths
    mongoose  = require('mongoose'),
    _         = require('underscore'); //MongoDB integration

//Create server
var app = express();

console.log( app.settings.env );

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


// Get a single book by id
app.get('/api/books/:id', function(request, response) {
  return BookModel.findById( request.params.id, function(err, book) {
    return !err ? response.send( book ) : console.log( err );
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



var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/library_database';
// // Connect to database
mongoose.connect( uristring, function( err, res ) {
  if (err) {
    console.log( 'Error connecting to:' + uristring + '. ' + err );
  }
  else {
    console.log('Successfully connected to: ' + uristring );
  }
});

// Schemas
var Book = new mongoose.Schema({
  title: String,
  author: String,
  releaseDate: Date
});

// Models
var BookModel = mongoose.model( 'Book', Book );
