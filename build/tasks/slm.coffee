module.exports = ->
  @loadNpmTasks "grunt-slm"

  # Move bower_components and app logic during a build.
  @config "slm",
    compile:
      expand: true
      ext: '.hbs'
      src: 'app/**/*.slm' # -> src/file1.slm, src/file2.slm
      dest: 'dist/' # -> dest/file1.html, dest/file2.html
