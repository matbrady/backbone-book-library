// Library View

define('library/view', [
	'jquery',
	'backbone', 
	'underscore', 
	'library/collection', 
	'book/view', 
	'fileUpload/view'
], function($, Backbone, _, LibCollection, BookView, FileUploadView) {

	var LibraryView = Backbone.View.extend({

		el: '#library',
		errors: [],
		formData: {}, // Object populated by input values used to build a new Book Model

		events: {
			'click #add': 'addBook'
		},


		initialize: function( initialBooks ) {
			var self = this;

			this.$fields = $('#addBook input');
			this.$errors = this.$('.errors');
			this.$books = this.$('#books');
			this.uploadView = new FileUploadView({el: this.$('#fileUpload')});

			this.render();

			// Listeners
			this.listenTo( this.collection, 'add', this.renderBook );
			this.listenTo( this.collection, 'reset', this.renderAll );
		},


		// render library by rendering each book in its collection
		render: function() {
			this.collection.each(function(item){
				console.log('from render');
				this.renderBook( item );
			}, this);
		},


		// render a book by creating a BookView and appending the
		// element it renders to the library's element
		renderBook: function( item ) {
			var bookView = new BookView({
				model: item
			});

			this.$books.append( bookView.render().el );
		},


		renderAll: function() {
			console.log('WE SHALL RENDER EVERYTHING');
		},


		addBook: function( evt ) {
			evt.preventDefault();

			this.validateForm();

			console.log( this.formData );

			if ( _.isEmpty(this.errors) ) {
				this.collection.create( this.formData );
				this.$fields.val(''); // clear the form values once the book has been added
				this.uploadView._resetView();
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
				if ( $input.val().trim() != '' && $input.attr('id') !== 'fileSelect' ) {


					this.formData[ el.id ] = $input.val();		// Add value to formData
					$input.removeClass('error');		// remove `error` class
				}

				// else if ( $input.attr('id') === 'coverImage' && $input.val() === '' ) {
				// 	console.log('fileSelect has no value');
				// 	// Check for fileDrop src
				// }

				// No value and field is required
				else if ( $input.attr('required') && $input.val() === '' ) {
					$input.addClass('error');

					switch ( el.id ) {
						case 'coverImage':
							this.errors.push('Please Provide a Cover Image');
						break;
						case 'title':
							this.errors.push('Please Provide a Title');
						break;
						case 'author': 
							this.errors.push('Please Provide a Author');
						break;
						case 'releaseDate':
							this.errors.push('Please Provide a Release Date');
						break;
						case 'keywords':
							this.errors.push('Please Provide Some Keywords');
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