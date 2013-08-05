# Application View

define 'appView', ['jquery', 'backbone', 'underscore'], ($, Backbone, _) ->

	AppView = Backbone.View.extend

		el: '#app'

		initialize: -> 
			console.log 'Generating the App View'