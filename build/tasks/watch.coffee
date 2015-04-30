module.exports = ->
  @loadNpmTasks "grunt-contrib-watch"

  @config "watch",
    configs:
      files: [ 'Gruntfile.coffee', 'build/tasks/*' ]
      options:
        reload: true
    coffee:
      files: 'app/**/*.coffee'
      tasks: ['coffee']
      options:
        spawn: false
        interrupt: true
        debounceDelay: 100
        livereload: true
    styl:
      files: 'app/**/*.styl'
      tasks: ['stylus']
      options:
        spawn: false
        interrupt: true
        debounceDelay: 100
        livereload: true
    slm:
      files: 'app/**/*.slm'
      tasks: ['slm']
      options:
        spawn: false
        interrupt: true
        debounceDelay: 100
        livereload: true
    bower:
      files: ['bower_components/**', 'app/images/**']
      tasks: ['copy']
