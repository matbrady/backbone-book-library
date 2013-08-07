// Library View

define('library/view', ['jquery', 'backbone', 'underscore', 'library/collection', 'book/model', 'book/view'], function($, Backbone, _, LibCollection, BookModel, BookView) {

	var LibraryView = Backbone.View.extend({

		el: '#books',
		errors: [],
		formData: {}, // Object populated by input values used to build a new Book Model

		events: {
			'click #add': 'addBook'
		},


		initialize: function( initialBooks ) {
			this.$fields = $('#addBook input');
			this.$errors = this.$('.errors');

			this.collection = new LibCollection( initialBooks );
			this.render();

			this.listenTo( this.collection, 'add', this.renderBook );
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
		},


		addBook: function( evt ) {
			evt.preventDefault();

			this.validateForm();

			if ( _.isEmpty(this.errors) ) {
				this.collection.add( new BookModel( this.formData ) );
				this.$fields.val(''); // clear the form values once the book has been added
				this.$errors.empty(); // clear all the errors
			}

			else {
				this.renderErrors(); // show the errors
			}
		},


		validateForm: function() {
			// Reset existing formData and errors
			this.formData = {};
			this.errors = [];

			_.each( this.$fields, function( el ) {
				var $input = $(el);

				// Check if it has a value - YES
				if ( $input.val().trim() != '') {
					this.formData[ el.id ] = $input.val();		// Add value to formData
					$input.removeClass('error');		// remove `error` class
				}

				// No value and field is required
				else if ( $input.attr('required') && $input.val() === '' ) {
					$input.addClass('error');

					switch ( el.id ) {
						case 'title':
							this.errors.push('Please Provide a Title');
						break;
						case 'author': 
							this.errors.push('Please Provide a Author');
						break;
					}
				}

			}, this);
		},


		renderErrors: function() {

			this.$errors.empty(); // Clear any existing errors

			_.each( this.errors, function( error ) {
				this.$errors.append( $('<p>').text( error ) );
			}, this);



		}

	});

	return LibraryView;

});