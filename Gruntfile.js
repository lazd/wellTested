module.exports = function(grunt) {
  var clientIncludeOrder = require('./include.conf.js');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: 'build/*',
      results: 'results/*'
    },
    jshint: {
      gruntfile: 'Gruntfile.js',
      clientTests: 'test/client/*.js',
      e2eTests: 'test/e2e/*.js',
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
      server: {
        src: [ 'server/**' ],
        dest: 'build/'
      }
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
    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'build/server/server.js'
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
    casperjs: {
      options: {
        // casperjsOptions: ['--engine=slimerjs'] // Use SlimerJS (Gecko)
        // casperjsOptions: ['--log-level=debug', '--direct', '--verbose'] // Verbose logging
      },
      e2e: {
        files: {
          'results/casper': 'test/e2e/**/*.js'
        }
      }
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      client: {
        files: [ 'client/**' ],
        tasks: [ 'build' ]
      },
      unitTests: {
        files: [ 'client/scripts/wt/**/*.js', 'test/client/**/*.js' ],
        tasks: [ 'jshint:clientTests', 'karma:unit:run' ]
      },
      e2eTests: {
        files: [ 'server/**', 'client/**', 'test/e2e/**/*.js' ],
        tasks: [ 'jshint:e2eTests', 'casperjs' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-casperjs');

  // Perform a build
  grunt.registerTask('build', [ 'clean', 'copy', 'concat' ]);

  // Run e2e tests once
  grunt.registerTask('teste2e', [ 'jshint:e2eTests', 'express', 'casperjs' ]);

  // Run client tests once
  grunt.registerTask('testClient', [ 'jshint:clientTests', 'karma:single' ]);

  // Run all tests once
  grunt.registerTask('test', [ 'testClient', 'teste2e' ]);

  // Start watching and run tests when files change
  grunt.registerTask('default', [ 'build', 'jshint', 'express', 'karma:unit:start', 'watch' ]);
};
