module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-casperjs');

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
      options: {
        configFile: 'karma.conf.js',
        reporters: ['progress', 'coverage']
      },
      // Watch configuration
      watch: {
        background: true,
        reporters: ['progress']
      },
      // Single-run configuration for development
      single: {
        singleRun: true,
      },
      // Single-run configuration for CI
      ci: {
        singleRun: true,
        coverageReporter: {
          type: 'lcov',
          dir: 'results/coverage/'
        }
      }
    },
    coveralls: {
      options: {
        coverage_dir: 'results/coverage/'
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
        tasks: [ 'build', 'karma:watch:run', 'casperjs' ]
      },
      server: {
        files: [ 'server/**' ],
        tasks: [ 'build', 'express:dev', 'casperjs' ],
        options: {
          spawn: false // Restart server
        }
      },
      unitTests: {
        files: [ 'test/client/**/*.js' ],
        tasks: [ 'jshint:clientTests', 'karma:watch:run' ]
      },
      e2eTests: {
        files: [ 'test/e2e/**/*.js' ],
        tasks: [ 'jshint:e2eTests', 'casperjs' ]
      }
    }
  });

  // Perform a build
  grunt.registerTask('build', [ 'clean', 'copy', 'concat' ]);

  // Run e2e tests once
  grunt.registerTask('teste2e', [ 'jshint:e2eTests', 'express:dev', 'casperjs' ]);

  // Run client tests once
  grunt.registerTask('testClient', [ 'jshint:clientTests', 'karma:single' ]);

  // Run all tests once
  grunt.registerTask('test', [ 'testClient', 'teste2e' ]);

  // Run all tests once
  grunt.registerTask('ci', [ 'build', 'karma:ci', 'coveralls', 'express:dev', 'casperjs' ]);

  // Start watching and run tests when files change
  grunt.registerTask('default', [ 'build', 'jshint', 'express:dev', 'karma:watch:start', 'watch' ]);
};
