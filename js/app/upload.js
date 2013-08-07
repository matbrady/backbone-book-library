// Upload Testing

define('upload', ['jquery'], function($) {


	// getElementById
	function $id(id) {
		return document.getElementById(id);
	}


	// output information
	// function Output(msg) {
	// 	var m = $id("messages");
	// 	m.innerHTML = msg + m.innerHTML;
	// }


	// file drag hover
	function FileDragHover(e) {
		e.stopPropagation();
		e.preventDefault();
		// e.target.className = (e.type == "dragover" ? "hover" : "");
	}


	// file selection
	function FileSelectHandler(e) {

		console.log( e.target.files, e.dataTransfer.files  );

		// cancel event and hover styling
		FileDragHover(e);

		// fetch FileList object
		var files = e.target.files || e.dataTransfer.files;

		// process all File objects
		for (var i = 0, f; f = files[i]; i++) {
			ParseFile(f);
		}

	}


	// output file information
	function ParseFile(file) {

		console.log( file );

		// Output(
		// 	"<p>File information: <strong>" + file.name +
		// 	"</strong> type: <strong>" + file.type +
		// 	"</strong> size: <strong>" + file.size +
		// 	"</strong> bytes</p>"
		// );

		// // display an image
		// if (file.type.indexOf("image") == 0) {
		// 	var reader = new FileReader();
		// 	reader.onload = function(e) {
		// 		Output(
		// 			"<p><strong>" + file.name + ":</strong><br />" +
		// 			'<img src="' + e.target.result + '" /></p>'
		// 		);
		// 	}
		// 	reader.readAsDataURL(file);
		// }

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

	}


	// initialize
	function Init() {

		var filedrag = $id("upload");

		// is XHR2 available?
		var xhr = new XMLHttpRequest();
		if (xhr.upload) {

			// file drop
			filedrag.addEventListener("dragover", FileDragHover, false);
			filedrag.addEventListener("dragleave", FileDragHover, false);
			filedrag.addEventListener("drop", FileSelectHandler, false);

		}

	}

	// call initialization file
	if (window.File && window.FileList && window.FileReader) {
		Init();
	}

	return;
});