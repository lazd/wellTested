# wellTested
> A simple, well-tested todo app

## Initial setup

Install the `grunt-cli` module globally:

```shell
npm install -g grunt-cli
```

Install dependencies:

```shell
npm install
```


## Running the tests

To build and run tests once:

```shell
grunt build test
```

To build, then watch for changes and run tests accordingly:

```shell
grunt
```


# Software Used

## [Jasmine]

Jasmine is used for client-side unit testing.

## [Karma]

Karma is used to run unit tests client-side in real browsers.

The following Karma plugins are used:

* [karma-coverage] - Build coverage reports with Istanbul
* [karma-jasmine] - Allow unit tests to be written with Jasmine
* [karma-chrome-launcher] - Launch Chrome for testing
* [karma-firefox-launcher] - Launch Firefox for testing

## [Istanbul]

Istanbul generates code coverage reports for client-side unit tests.

## [CasperJS]

CasperJS is used to run client-side end-to-end tests in a headless browser.

## [PhantomCSS]

PhantomCSS is used to run visual regression tests in a headless browser.

## [Grunt]

Grunt is used to perform build tasks and kick of testing operations, as well as watch files for changes and test accordingly.

The following Grunt plugins are used:

* [grunt-karma] - Start Karma from Grunt
* [grunt-casperjs] - Start CasperJS from Grunt
* [grunt-phantomcss] - Start PhantomCSS from Grunt
* [grunt-express-server] - Start a server for CasperJS and PhantomCSS testing
* [grunt-contrib-jshint] - Check for JavaScript errors before running tests
* [grunt-contrib-watch] - Watch files for changes and run tasks accordingly
* [grunt-karma-coveralls] - Submit code coverage reports to Coveralls


# Services Used

## [TravisCI]

TravisCI is used to run tests when commits are pushed or pull requests are submitted.

See [GUI & Headless browser testing with Travis](http://about.travis-ci.org/docs/user/gui-and-headless-browsers/) for information on setting up Travis for headless testing.

## [Coveralls]

Coveralls is used to track code coverage over time. After tests run on TravisCI, the code coverage report is submitted to Coveralls.

<!--
* Build a little server-side
  * Do server-side unit testing with [Jasmine] or [Mocha] + [Chai]
  * Do API integration testing with [APIEasy] or [Frisby]
-->

[Grunt]: http://gruntjs.com/
[Jasmine]: https://jasmine.github.io/
[Karma]: http://karma-runner.github.io/
[karma-coverage]: https://github.com/karma-runner/karma-coverage
[karma-jasmine]: https://github.com/karma-runner/karma-jasmine
[karma-chrome-launcher]: https://github.com/karma-runner/karma-chrome-launcher
[karma-firefox-launcher]: https://github.com/karma-runner/karma-firefox-launcher
[CasperJS]: http://casperjs.org/
[PhantomCSS]: https://github.com/Huddle/PhantomCSS
[Istanbul]: http://gotwarlost.github.io/istanbul/
[grunt-karma]: https://github.com/karma-runner/grunt-karma
[grunt-casperjs]: https://github.com/ronaldlokers/grunt-casperjs
[grunt-phantomcss]: https://github.com/chrisgladd/grunt-phantomcss
[grunt-express-server]: https://github.com/ericclemmons/grunt-express-server
[grunt-contrib-jshint]: https://github.com/gruntjs/grunt-contrib-jshint
[grunt-contrib-watch]: https://github.com/gruntjs/grunt-contrib-watch
[grunt-karma-coveralls]: https://github.com/mattjmorrison/grunt-karma-coveralls

[Mocha]: http://mochajs.org/
[Chai]: http://chaijs.com/
[APIEasy]: https://github.com/flatiron/api-easy
[Frisby]: http://frisbyjs.com/
[Coveralls]: https://coveralls.io/
[TravisCI]: https://travis-ci.org/
