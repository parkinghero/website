define (require, exports, module) =>
  "use strict"

  Layout = require "layoutmanager"

  CommitItemView = Layout.extend
    template: require "template!./template"
    el: false
    initialize: ->
      @listenTo @model, "change", @render

  module.exports = CommitItemView
