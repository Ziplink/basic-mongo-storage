'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    githooks: {
      all: {
        'pre-commit': 'test',
      },
    },
    jscs: {
      src: './',
      options: {
        config: '.jscsrc',
        fix: false, // Autofix code style violations when possible
        reporter: 'text',
        reporterOutput: './jscs.log',
      },
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'mocha.log',
          quiet: false,
          clearRequireCache: false,
        },
        src: ['test/*.js'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('test', ['jscs', 'mochaTest']);

};