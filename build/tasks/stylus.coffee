module.exports = ->
  @loadNpmTasks "grunt-contrib-stylus"

  @config "stylus",
    compile:
        files:
          'dist/app/styles/index.css': 'app/styles/index.styl'        
