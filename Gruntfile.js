module.exports = function(grunt) {
  var clientIncludeOrder = [
    'client/scripts/wt/wt.js',
    'client/scripts/wt/wt.polyfills.js',
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
       // Task-specific options go here.
       casperjsOptions: ['--log-level=debug', '--direct', '--verbose']
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
        tasks: [ 'karma:unit:run' ]
      },
      e2eTests: {
        files: [ 'server/**', 'client/**', 'test/e2e/**/*.js' ],
        tasks: [ 'casperjs' ]
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
  grunt.registerTask('build', [ 'jshint', 'clean', 'copy', 'concat' ]);

  // Run tests once
  grunt.registerTask('e2e', [  'express', 'casperjs' ]);

  // Run tests once
  grunt.registerTask('test', [  'karma:single', 'e2e' ]);

  // Start watching by default
  grunt.registerTask('default', [ 'build', 'express', 'karma:unit:start', 'watch' ]);
};
