// File Upload Model

define('fileUpload/model', [
	'jquery',
	'backbone'
], function($, Backbone) {
	
	var FileModel = Backbone.Model.extend({

		defaults: {
			defaultText: 'Drop A Cover Image Here',
			result: {}
		},


		initialize: function() {

			var _this = this;

			this.on('change:data', function() {

				var reader = new FileReader();
				reader.onload = function(e) {
					_this.set('result', e.target.result);
				}
				reader.readAsDataURL( this.get('data') );

			}, this);

		}

	});

	return FileModel;

});