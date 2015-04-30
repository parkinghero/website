module.exports = ->
  @loadNpmTasks "grunt-express-server"

  @config "express",
    dev:
      options:
        script: 'server.js'
