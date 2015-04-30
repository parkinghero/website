define (require, exports, module) ->
  "use strict"

  # External dependencies.
  Backbone = require "backbone"
  Layout = require "layoutmanager"

  Issue = require "modules/issues/index"

  c = new Backbone.Collection [
    {description: "Tim", date: "25/02/2015"},
    {description: "Ida", date: "21/02/2015"},
    {description: "Rob", date: "12/02/2015"}
  ]

  window.c = c


  # Defining the application router.
  Router = Backbone.Router.extend
    initialize: ->
      Layout = Backbone.Layout.extend
        el: "main"
        template: require "template!./templates/main"
        views:
          ".ph-issues": new Issue.Views.List { collection: c }

      new Layout().render()

    routes:
      "": "index"
    index: ->
      console.log "Welcome to your / route."

  module.exports = Router
