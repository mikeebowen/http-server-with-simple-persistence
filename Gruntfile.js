'use strict';

exports = module.exports = {};

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');

  // initialize grunt
  grunt.initConfig({
    // create jshint task
    jshint: {
      dev: {
        src: ['Gruntfile.js', 'server.js', 'lib/**/*.js', 'test/**/*.js']
      },
      // bring in options from .jshintrc
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jscs: {
      dev: {
        src: ['<%= jshint.dev.src %>']
      }
    },

    simplemocha: {
      dev: {
        src: ['test/**/*.js']
      }
    },

    watch: {
      files: ['<%= jshint.dev.src %>', '<%= simplemocha.dev.src %>'],
      tasks: ['jshint', 'simplemocha']
    }
  });

  grunt.registerTask('test', ['jshint:dev'], ['jscs:dev']);
  grunt.registerTask('mocha', ['simplemocha:dev']);
  grunt.registerTask('default', ['test', 'mocha', 'watch']);
}
