define (require, exports, module) ->
  "use strict"

  Backbone = require "backbone"

  module.exports = Backbone.Collection.extend
    url: 'issues.json'
