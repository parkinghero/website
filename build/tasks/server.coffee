module.exports = ->
  @loadNpmTasks "grunt-contrib-connect"

  @config "connect",
    dev:
      options:
        port: 8000
        hostname: "0.0.0.0"
        base: 'dist'
        debug: yes
