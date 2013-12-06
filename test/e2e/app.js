// Dump log messages
casper.on('remote.message', function(message) {
  this.echo('Log: '+ message, 'LOG');
});

// Dump uncaught errors
casper.on('page.error', function(msg, trace) {
  this.echo('Error: ' + msg, 'ERROR');
});

casper.test.begin('App is setup correctly', 3, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    test.assertTitle('Well-Tested', 'Page should have the correct title');
    test.assertExists('h1', 'Heading should exist');
    test.assertExists('ul.wt-list', 'List should exist');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Adds and removes todo items', 2, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    // Add item
    this.fill('form.wt-new', {
      item: 'Item1'
    }, true);

    // Check that item exists
    test.assertSelectorHasText('.wt-item label', 'Item1', 'List item should contain added item name');

    // Remove item
    this.click('button.wt-remove');

    test.assertDoesntExist('.wt-item', 'List item should not exist after item removed');
  });

  casper.run(function() {
    test.done();
  });
});


casper.test.begin('Does not add empty todo items', 1, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    // Submit the form without filling it out
    this.fill('form.wt-new', { item: '' }, true);

    test.assertDoesntExist('.wt-item', 'List item should not be added for empty todos');
  });

  casper.run(function() {
    test.done();
  });
});
