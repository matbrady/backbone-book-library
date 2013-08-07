// Book View

define('book/view', ['jquery', 'backbone', 'underscore', 'text!book/template.html'], function($, Backbone, _, bookTemplate) {
	
	var BookView = Backbone.View.extend({

		tagName: 'div',

		className: 'book-contanier',
		
		template: _.template( bookTemplate ),

		render: function() {
			// this.el is what we defined in tagName. use $el to get access to jQuery html() function
			this.$el.html( this.template( this.model.toJSON() ) );

			return this;
		}

	});

	return BookView

});