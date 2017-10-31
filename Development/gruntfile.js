module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
        options: {
            livereload: true
        },
        css: {
            files: ['sass/*.scss', 'sass/**/*.scss'],
            tasks: ['sass', 'postcss'],
            options: {
              spawn: false
            }
        },
        html: {
          files: ['index.html'],
          options: {
            spawn: false
          }
        }
    }, 
    sass: {
        dist: {
            options: {
              style: 'compressed'
            },
            files: {
                'style.min.css' : 'sass/style.scss'
            }
        }
    },
    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer'),
                require('postcss-font-magician')
            ]
        },
        dist: {
            src: 'style.min.css',
            dest: 'style.min.css'
        }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'postcss', 'watch']);

};