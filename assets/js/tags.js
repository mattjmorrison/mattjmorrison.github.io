var App = Ember.Application.create({
  rootElement: '#tags-application'
});


App.Router.map(function() {
  this.resource("index", {path: "/"}, function() {
    this.resource("tag", {path: "/:tag"});
  });
});


App.TagRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('index').filter(function(item) {
      if(params.tag == item.tag) {
        item.set('selected', true);
        return item;
      }
      item.set('selected', false);
      return;
    })[0];
  }
});


App.IndexRoute = Ember.Route.extend({
  model: function(params) {
    return App.Tag.find();
  }
});


App.Tag = Ember.Object.extend({
  selected: false
}).reopenClass({
  find: function(){
    return new Ember.RSVP.Promise(function(resolve, reject) {
      $.ajax({
        url: '/tags/data.js',
        dataType: 'json'
      }).done(function(response){
        Ember.run(function(){
          var tags = Ember.A([]);
          response.forEach(function(result) {
            tags.pushObject(App.Tag.create(result));
          });
          resolve(tags);
        });
      }).fail(function(response){
        reject(reesponse);
      });
    });
  }
});
