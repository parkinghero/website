define (require, exports, module) ->
  "use strict"

  Item = require("../item/view");

  module.exports = Backbone.Layout.extend
    beforeRender: ->
      @collection.each ((issue) ->
        @insertView "", new Item(model: issue)
      ), this

    serialize: ->
      issues: @collection

    initialize: ->
      @listenTo @collection, "change reset sync request", @render

