module.exports = ->

  # Load task configurations.
  @loadTasks "build/tasks"

  @registerTask "dev", [
    "clean"
    "copy"
    "coffee"
    "stylus"
    "processhtml"
    "slm"
    "connect"
    "regarde"
  ]

  # When running the default Grunt command, just lint the code.
  # @registerTask "default", [
  #   "clean"
  #   "jshint"
  #   "processhtml"
  #   "copy"
  #   "requirejs"
  #   "styles"
  # ]
