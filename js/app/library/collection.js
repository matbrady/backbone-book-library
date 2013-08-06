// Library Collection

define('library/collection', [
	'jquery',
	'backbone',
	'underscore',
	'book/model'	
], function($, Backbone, _, BookModel) {
	
	var LibraryCollection = Backbone.Collection.extend({

		model: BookModel
		
	});

	return LibraryCollection;

});