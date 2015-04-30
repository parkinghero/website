define (require, exports, module) ->
  "use strict"

  Layout = require "layoutmanager"

  module.exports = Layout.extend
    el: false
    template: require "template!./template"
    initialize: ->
      @listenTo @model, "change", @render
