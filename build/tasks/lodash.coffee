module.exports = ->
  @loadNpmTasks "grunt-lodash"

  # Run your source code through JSHint's defaults.
  @config "lodash", [
    "app/**/*.js"
  ]
