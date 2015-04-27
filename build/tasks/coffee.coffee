module.exports = ->
  @loadNpmTasks "grunt-contrib-coffee"

  @config "coffee",
    options:
      sourceMap: no
      bare: yes
    files:
      expand: yes
      flatten: no
      cwd: 'app'
      src: ['**/*.coffee']
      dest: 'dist/app'
      ext: '.js'
