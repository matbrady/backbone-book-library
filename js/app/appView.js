define('appView', ['jquery', 'backbone', 'underscore'], function($, Backbone, _) {
  var AppView;
  return AppView = Backbone.View.extend({
    el: '#app',
    initialize: function() {
      return console.log('Generating the App View');
    }
  });
});
