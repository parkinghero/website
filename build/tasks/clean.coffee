module.exports = ->
  @loadNpmTasks "grunt-contrib-clean"

  # Wipe out previous builds
  @config "clean", ['dist/']
