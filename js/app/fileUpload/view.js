// File Drop View

define('fileUpload/view', [
	'jquery',
	'backbone',
	'underscore',
	'fileUpload/model'
], function( $, Backbone, _, fileModel) {

	/** Basic DOM Structure
	*
		<div id="fileUpload">
		  <input id="coverImage" type="file" />
		  <div id="upload">
		    Drop A Cover Image Here
		  </div>
		</div>
	*
	*/

	var FileDropView = Backbone.View.extend({

		// el: '#fileUpload', // applied on creation 
		model: new fileModel(),

		events: {

			'change .fileSelect': '_selectEvent',
			'drop .fileDrop': '_dropEvent',
			'dragover .fileDrop': '_dragOverEvent',
			'dragleave .fileDrop': '_dragLeaveEvent'
		},


		initialize: function() {
			this.$fileDrop = this.$('.fileDrop');
			this.$fileSelect = this.$('.fileSelect');
			this.$hiddenInput = this.$('#coverImage');

			// Listeners
			this.listenTo(this.model, 'change:result', this._renderPreview );
		},


		_dropEvent: function(e) {
			this._voidDeafult(e);
			this.$fileDrop.removeClass('hover');
			this._getFileData(e);
		},


		_dragOverEvent: function(e) {
			this._voidDeafult(e);

			this.$fileDrop.addClass('hover');
		},


		_dragLeaveEvent: function(e) {
			this._voidDeafult(e);
			this.$fileDrop.removeClass('hover');
		},


		_getFileData: function(e) {
			if (e.originalEvent) e = e.originalEvent;

			// fetch FileList object
			var files = e.target.files || e.dataTransfer.files;

			// process all File objects
			for (var i = 0, f; f = files[i]; i++) {
				this.parseFile(f);
			}
		},


		// output file information
		parseFile: function(file) {
			var _this = this;
			// display an image
			if (file.type.indexOf("image") == 0) {
				this.model.set('data', file ) // the model data with file attributes
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
			else {
				alert('Please drop an image file');
			}
		},


		_renderPreview: function() {
			var result = this.model.get('result');
			this.$fileDrop.html('<img src="' + result + '" class="preview-image" />');
			this.$hiddenInput.val(result); // assigns a value to the hidden coverImage input field

			// Apply a fill class when an has been applied
			this.$fileDrop.addClass('filled');
		},


		_resetView: function() {
			this.$fileDrop.html( this.model.get('defaultText') )
				.removeClass('filled');
		},


		_selectEvent: function(e) {
			this._voidDeafult(e);
			this._getFileData(e);
		},


		_voidDeafult: function(e) {
			e.preventDefault();
			e.stopPropagation();
		}

	});

	return FileDropView;

});