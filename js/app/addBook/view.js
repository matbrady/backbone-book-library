define('addBook/view', ['jquery', 'backbone', 'underscore'], function($, Backbone, underscore) {
  var AddBookView;
  return AddBookView = Backbone.View.extend({
    el: '#addBook',
    initialize: function() {
      return console.log('Loading AddBookView');
    }
  });
});
