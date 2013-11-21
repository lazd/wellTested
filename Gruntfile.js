module.exports = function(grunt) {
  var clientIncludeOrder = [
    'client/scripts/wt/wt.js',
    'client/scripts/wt/wt.util.js',
    'client/scripts/wt/wt.App.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: 'build/*',
      results: 'results/*'
    },
    jshint: {
      gruntfile: 'Gruntfile.js',
      tests: 'test/**/*.js',
      client: clientIncludeOrder,
      options: {
        globals: {
          eqeqeq: true
        }
      }
    },
    copy: {
      client: {
        // Copy everything but the unconcatonated WT JS files
        src: [ 'client/**', '!client/scripts/wt/**' ],
        dest: 'build/'
      },
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* <%= pkg.homepage %>/\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>; Licensed <%= pkg.license %> */\n'
      },
      wt: {
        files: {
          'build/client/scripts/wt.js': clientIncludeOrder
        }
      }
    },
    karma: {
      // Watch configuration
      unit: {
        configFile: 'karma.conf.js',
        background: true
      },
      // Single-run configuration for CI
      single: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      client: {
        files: [ 'client/scripts/wt/**/*.js', 'test/**/*.js' ],
        tasks: [ 'build', 'karma:unit:run' ]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  // Perform a build
  grunt.registerTask('build', [ 'jshint', 'clean', 'copy', 'concat' ]);

  // Run tests once
  grunt.registerTask('test', [ 'karma:single' ]);

  // Start watching by default
  grunt.registerTask('default', [ 'build', 'karma:unit:start', 'watch' ]);
};
