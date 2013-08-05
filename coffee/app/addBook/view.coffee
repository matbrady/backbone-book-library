# Add Book View

define 'addBook/view', ['jquery', 'backbone', 'underscore'], ($, Backbone, underscore) ->

	AddBookView = Backbone.View.extend

		el: '#addBook',

		initialize: ->
			console.log 'Loading AddBookView'