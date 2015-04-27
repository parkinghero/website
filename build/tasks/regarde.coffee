module.exports = ->
  @loadNpmTasks "grunt-regarde"

  @config "regarde",
    coffee:
      files: 'app/**/*.coffee'
      tasks: ['coffee']
      spawn: true
    stylus:
      files: 'app/**/*.styl'
      tasks: ['stylus']
      spawn: true
    slm:
      files: 'app/**/*.slm'
      tasks: ['slm']
      spawn: true
    bower:
      files: ['bower_components/**', 'app/images/**']
      tasks: ['copy']
      spawn: true
