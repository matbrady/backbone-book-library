// Library View

define('library/view', ['jquery', 'backbone', 'underscore', 'library/collection', 'book/view'], function($, Backbone, _, LibCollection, BookView) {

	var LibraryView = Backbone.View.extend({

		el: '#books',
		errors: [],
		formData: {}, // Object populated by input values used to build a new Book Model

		events: {
			'click #add': 'addBook',
			'drop #upload': 'fileSelectHandler',
			'dragover #upload': 'fileDragHover',
			'dragleave #upload': 'fileDragHover'
		},


		initialize: function( initialBooks ) {
			var self = this;

			this.$fields = $('#addBook input');
			this.$errors = this.$('.errors');
			this.$upload = this.$('#upload');

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

			this.$el.append( bookView.render().el );
		},


		renderAll: function() {
			console.log('WE SHALL RENDER EVERYTHING');
		},


		addBook: function( evt ) {
			evt.preventDefault();

			this.validateForm();

			if ( _.isEmpty(this.errors) ) {
				this.collection.create( this.formData );
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
		},


		// file selection
		fileSelectHandler: function(e) {

			console.log( e.target.files, e.dataTransfer.files  );

			// cancel event and hover styling
			this.fileDragHover(e);

			// fetch FileList object
			var files = e.target.files || e.dataTransfer.files;

			// process all File objects
			for (var i = 0, f; f = files[i]; i++) {
				this.parseFile(f);
			}

		},


		// file drag hover
		fileDragHover: function(e) {
			e.stopPropagation();
			e.preventDefault();
			// e.target.className = (e.type == "dragover" ? "hover" : "");
		},


		// output file information
		parseFile: function(file) {

			console.log( file );

			// Output(
			// 	"<p>File information: <strong>" + file.name +
			// 	"</strong> type: <strong>" + file.type +
			// 	"</strong> size: <strong>" + file.size +
			// 	"</strong> bytes</p>"
			// );

			// display an image
			if (file.type.indexOf("image") == 0) {
				var reader = new FileReader();
				reader.onload = function(e) {
					// Output(
					// 	"<p><strong>" + file.name + ":</strong><br />" +
					// 	'<img src="' + e.target.result + '" /></p>'
					// );
					$('body').append('<img src="' + e.target.result + '" /></p>');
				}
				reader.readAsDataURL(file);
			}

			// // display text
			// if (file.type.indexOf("text") == 0) {
			// 	var reader = new FileReader();
			// 	reader.onload = function(e) {
			// 		Output(
			// 			"<p><strong>" + file.name + ":</strong></p><pre>" +
			// 			e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
			// 			"</pre>"
			// 		);
			// 	}
			// 	reader.readAsText(file);
			// }

		},

		renderUpload: function() {
			console.log('loading preview');
		}



	});

	return LibraryView;

});