define('app', ['$.bootstrap', 'appView', 'addBook/view'], function($, AppView, AddBookView) {
  var addBook, appView;
  appView = new AppView();
  addBook = new AddBookView();
  return console.log('hello world');
});
