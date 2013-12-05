# wellTested
> A simple, well-tested todo app

## Running the tests

To build and run tests once:

```
grunt build test
```

To build, then watch for changes and run tests accordingly:

```
grunt
```


# Software Used

## [Jasmine]

Jasmine is used for client-side unit testing.

## [Karma]

Karma is used to run unit tests client-side in real browsers.

The following Karma plugins are used:

* karma-coverage - Build coverage reports with Istanbul
* karma-jasmine - Allow unit tests to be written with Jasmine
* karma-junit-reporter - Output JUnit-style .xml reports on tests

## [Istanbul]

Istanbul generates code coverage reports for client-side unit tests.

## [CasperJS]

CasperJS is used to run client-side end-to-end tests in a headless browsers.

## [Grunt]

Grunt is used to perform build tasks and kick of testing operations, as well as watch files for changes and test accordingly.

The following Grunt plugins are used:

* [grunt-karma] - Start Karma from Grunt
* [grunt-casperjs] - Start CasperJS from Grunt
* [grunt-express-server] - Start a server for CasperJS testing
* [grunt-contrib-jshint] - Check for JavaScript errors before running tests
* [grunt-contrib-watch] - Watch files for changes and run tasks accordingly


# Services Used

## [TravisCI]

TravisCI is used to run tests when commits are pushed or pull requests are submitted.

See [GUI & Headless browser testing with Travis](http://about.travis-ci.org/docs/user/gui-and-headless-browsers/) for information on setting up Travis for headless testing.


# Todo

We're not done here, there's plenty to do for this experiment to be well-vetted.

* Build a little server-side
  * Do server-side unit testing with [Jasmine] or [Mocha] + [Chai]
  * Do API integration testing with [APIEasy] or [Frisby]
* Setup code coverage tracking with [Coveralls.io]


[Grunt]: http://gruntjs.com/
[Jasmine]: http://pivotal.github.io/jasmine/
[Karma]: http://karma-runner.github.io/
[CasperJS]: http://casperjs.org/
[Istanbul]: http://gotwarlost.github.io/istanbul/
[grunt-karma]: https://github.com/karma-runner/grunt-karma
[grunt-casperjs]: https://github.com/ronaldlokers/grunt-casperjs
[grunt-express-server]: https://github.com/ericclemmons/grunt-express-server
[grunt-contrib-jshint]: https://github.com/gruntjs/grunt-contrib-jshint
[grunt-contrib-watch]: https://github.com/gruntjs/grunt-contrib-watch

[Mocha]: http://visionmedia.github.io/mocha/
[Chai]: http://chaijs.com/
[APIEasy]: https://github.com/flatiron/api-easy
[Frisby]: http://frisbyjs.com/
[Coveralls.io]: https://coveralls.io/
[TravisCI]: https://travis-ci.org/
