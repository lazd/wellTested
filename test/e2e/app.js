casper.test.begin('App is setup correctly', 5, function suite(test) {
    casper.start('http://localhost:3000/', function() {
        test.assertTitle('Well-Tested', 'Page has correct title');

        test.assertEval(function() {
            return typeof wt !== 'undefined';
        }, 'wt namespace is defined');

        test.assertEval(function() {
            return typeof wt.App !== 'undefined';
        }, 'wt.App is defined');
    });

    // casper.waitFor(function check() {
    //     return this.evaluate(function() {
    //         return typeof wt.app !== 'undefined';
    //     });
    // }, function then() {    // step to execute when check() is ok
    //     test.assertExists('ul.wt-list', 'main list is found');
    // }, function timeout() { // step to execute if check has failed
    //     this.echo("Timeout: page did not load in time...").exit();
    // });

    casper.then(function() {
        test.assertExists('h1', 'heading is found');
        test.assertExists('ul.wt-list', 'main list is found');
    });

    casper.run(function() {
        test.done();
    });
});

/*
casper.test.begin('App works as expected', 5, function suite(test) {
    casper.start('http://localhost:3000/', function() {
        // this.fill('form[action="/search"]', {
        //     q: 'casperjs'
        // }, true);
        // test.assertEval(function() {
        //     return __utils__.findAll('h3.r').length >= 10;
        // }, 'google search for \'casperjs\' retrieves 10 or more results');
    });

    casper.run(function() {
        test.done();
    });
});
*/
