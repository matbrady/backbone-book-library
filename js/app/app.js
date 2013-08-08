// Book Library Application

define('app', [
	'$.bootstrap',
	'underscore',
	'shared',
	'library/view',
	'library/collection'
], function($, _, App, LibView, LibCollection){

	window.app = App;

	app.LibraryCollection = new LibCollection( );

	app.LibraryView = new LibView({ collection: app.LibraryCollection });

	app.LibraryCollection.fetch();

});
