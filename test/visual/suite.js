var fs = require('fs');

/**
 * Arguments passed in from the grunt task
 */
var args = JSON.parse(phantom.args);

/**
 * Initialise CasperJs
 */
phantom.casperPath = fs.workingDirectory+'/CasperJs';
phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');
phantom.injectJs('jquery.js');

var casper = require('casper').create({
  viewportSize: args.viewportSize || {
    width: 1024,
    height: 768
  }
});

/**
 *  Require and initialise PhantomCSS module
 */
var phantomcss = require('./phantomcss.js');

phantomcss.init({
  screenshotRoot: args.screenshots || './screenshots',
  failedComparisonsRoot: args.failures || './screenshots',

  onFail: function(test){
    console.log('Failed: '+test.filename+' by a factor of '+test.mismatch);
  },
  onPass: function(test){
    console.log('Passed: '+test.filename);
  },
  onTimeout: function(test){
    console.log('Timeout: '+test.filename);
  },
  onComplete: function(allTests, noOfFails, noOfErrors){
    var totalFailures = noOfFails + noOfErrors;
    var noOfPasses = allTests.length - totalFailures;
    console.log('Passed: '+ noOfPasses);
    if (totalFailures > 0) {
      console.log('Failed: '+ noOfFails);
      console.log('Errors: '+ noOfErrors);
      phantom.exit(1);
    }
  }
});

/**
 * The test scenario
 */
// casper.start(args.server).then(function(){
//     phantomcss.screenshot('#coffee-machine-wrapper', 'open coffee machine button');
// }).then(function(){
//     casper.click('#coffee-machine-button');
    
//     // wait for modal to fade-in 

//     casper.waitForSelector('#myModal:not([style*="display: none"])',
//         function success(){
//             phantomcss.screenshot('#myModal', 'coffee machine dialog');
//         },
//         function timeout(){
//             casper.test.fail('Should see coffee machine');
//         }
//     );
// }).then(function(){
//     casper.click('#cappuccino-button');
//     phantomcss.screenshot('#myModal', 'cappuccino success');
// }).then(function(){
//     casper.click('#close');

//     // wait for modal to fade-out
//     casper.waitForSelector('#myModal[style*="display: none"]',
//         function success(){
//             phantomcss.screenshot('#coffee-machine-wrapper', 'coffee machine close success');
//         },
//         function timeout(){
//             casper.test.fail('Should be able to walk away from the coffee machine');
//         }
//     );
// });

casper.start(args.server).then(function(){
    phantomcss.screenshot('#todo-app', 'Main app');
});

/**
 * End tests and compare screenshots
 */
casper.then(function() {
    phantomcss.compareAll();
}).
run(function() {
    phantom.exit(phantomcss.getExitStatus());
});
