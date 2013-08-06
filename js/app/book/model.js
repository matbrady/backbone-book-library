// Book Model

define('book/model', [
	'jquery',
	'backbone'
], function($, Backbone){

	var Book = Backbone.Model.extend({
		defaults: {
			coverImage: 'img/placeholder.png',
			title: 'No Title',
			author: 'Unknown',
			releaseDate: 'Unknown',
			keywords: 'None'
		}
	});

});