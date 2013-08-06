// Library View

define('library/view', ['jquery', 'backbone', 'underscore', 'library/collection', 'book/view'], function($, Backbone, _, LibCollection, BookView) {

	var LibraryView = Backbone.View.extend({

		el: '#books',

		initialize: function( initialBooks ) {
			this.collection = new LibCollection( initialBooks );
			this.render();
		},

		// render library by rendering each book in its collection
		render: function() {
			this.collection.each(function(item){
				this.renderBook( item );
			}, this);
		},

		// render a book by creating a BookView and appending the
		// element it renders to the library's element
		renderBook: function( item ) {
			var bookView = new BookView({
				model: item
			});

			this.$el.append( bookView.render().el );
		}

	});

	return LibraryView;

});