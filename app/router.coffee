define (require, exports, module) ->
  "use strict"

  # External dependencies.
  Backbone = require "backbone"
  Layout = require "layoutmanager"
  Issue = require "modules/issue/view"

  M = Backbone.Model.extend
      defaults:
        name: 'Maks'

  window.issue = new Issue { model: new M }

  # Defining the application router.
  Router = Backbone.Router.extend
    initialize: ->
      Layout = Backbone.Layout.extend
        el: "main"
        template: require "template!./templates/main"

      new Layout().render()

    routes:
      "": "index"
    index: ->
      console.log "Welcome to your / route."

  module.exports = Router
