# Registry Application

define 'app', ['$.bootstrap', 'appView', 'addBook/view'], ($, AppView, AddBookView) ->

	appView = new AppView()

	addBook = new AddBookView()

	console.log 'hello world';