// Library Collection

define('library/collection', [
	'jquery',
	'backbone',
	'localstorage',
	'underscore',
	'book/model'	
], function($, Backbone, localStorage, _, BookModel) {
	
	var LibraryCollection = Backbone.Collection.extend({

		model: BookModel,

		localStorage: new Backbone.LocalStorage('Backbone-Library')
		
	});

	return LibraryCollection;

});