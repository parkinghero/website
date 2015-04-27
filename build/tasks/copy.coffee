module.exports = ->
  @loadNpmTasks "grunt-contrib-copy"

  # Move bower_components and app logic during a build.
  @config "copy",
    static:
      files: [
        {
          expand: true
          src: "bower_components/**"
          dest: "dist/"
        }
        {
          expand: true
          src: ["app/**", "!app/**/*.{coffee,slm,styl}"]
          dest: "dist/"
        }
      ]

