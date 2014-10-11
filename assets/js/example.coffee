---
---

App = Ember.Application.create
  rootElement: '#tags-application'


App.Router.map ->
  @resource "index", path: "/", ->
    @resource "tag", path: "/:tag"


App.TagRoute = Ember.Route.extend
  model: (params) ->
    @modelFor('index').filter((item) ->
      if params.tag == item.tag
        item.set('selected', true)
        return item
      item.set('selected', false)
      return
    )[0]


App.IndexRoute = Ember.Route.extend
  model: (params) ->
    App.Tag.find()


App.Tag = Ember.Object.extend(
  selected: false
).reopenClass
  find: ->
    new Ember.RSVP.Promise (resolve, reject) ->
      $.ajax(
        url: '/tags/data.js'
        dataType: 'json'
      ).done((response) ->
        Ember.run ->
          tags = Ember.A([])
          response.forEach (result) ->
            tags.pushObject(App.Tag.create(result))
          resolve(tags)
      ).fail((response) ->
        reject(reesponse)
      )
