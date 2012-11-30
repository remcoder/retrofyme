/*global module:false*/


module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! jQuery.Retrofy.js - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://realstuffforabstractpeople.com/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        '@remcoder; Licensed MIT */'
    },

    lint: {
      files: [
          'js/zepQuery.js',
          'js/utils.js',
          'js/context.js',
          'js/retrofy.js',
          'js/Retrofy.Colors.C64.js',
          'js/Retrofy.Colors.NES.js',
          'js/Retrofy.Colors.ZXSpectrum.js',
          'js/Retrofy.dashboard.js',
          'js/jquery.retrofy.js']
    },

    qunit: {
      files: ['test/**/*.html']
    },

    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'lib/*.js', '<config:lint.files>'],
        dest: '../dist/jquery.retrofy.js',
        separator : ';'
      }
    },


    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: '../dist/jquery.retrofy.min.js'
      }
    },

    watch: {
      files: ['grunt.js', '<config:lint.files>'],
      tasks: 'lint concat min'
    },

    jshint: {
      options: {
        curly: false,
        eqeqeq: false,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },

      globals: {
        jQuery: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min');

};
