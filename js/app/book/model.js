// Book Model

define('book/model', [
	'jquery',
	'backbone'
], function($, Backbone){

	var Book = Backbone.Model.extend({
		defaults: {
			coverImage: 'http://placehold.it/80x105.jpg', // static: 'img/placeholder.png'
			title: 'No Title',
			author: 'Unknown',
			releaseDate: 'Unknown',
			keywords: 'None'
		},


		validate: function( attr ) {

		},


		initialize: function() {

			this.on('invalid', function(model, error){
				console.log( error );
			});
		}
	});

	return Book;

});