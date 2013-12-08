// Dump log messages
casper.on('remote.message', function(message) {
  this.echo('Log: '+ message, 'LOG');
});

// Dump uncaught errors
casper.on('page.error', function(msg, trace) {
  this.echo('Error: ' + msg, 'ERROR');
});

casper.test.begin('App is setup correctly', 2, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    test.assertExists('.todo-list', 'List should exist');
    test.assertExists('.todo-form', 'Form should exist');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Adds and removes todo items', 3, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    this.fill('.todo-form', {
      todo: 'Item1'
    }, true);

    // Check that item was added to the list
    test.assertExists('.todo-list .todo-item', 'List item should exist after being added');

    // Check that the name is correct
    test.assertField({type: 'css', path: '.todo-list .todo-item .todo-input'}, 'Item1', 'List item should contain added item name');

    // Mark item as done
    this.click('.todo-remove');

    test.assertDoesntExist('.todo-list .todo-item', 'List item should not exist after item removed');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Adds and removes multiple todo items', 3, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    this.fill('form.todo-form', {
      todo: 'Item1'
    }, true);

    this.fill('form.todo-form', {
      todo: 'Item2'
    }, true);

    this.fill('form.todo-form', {
      todo: 'Item3'
    }, true);

    // Check that items were added to the list
    test.assertElementCount('.todo-list .todo-item', 3, '3 items should be added');

    // Check that the names are correct
    test.assert(casper.evaluate(function(username, password) {
      var inputs = document.querySelectorAll('.todo-list .todo-item .todo-input');
      return inputs[0].value === 'Item1' && inputs[1].value === 'Item2' && inputs[2].value === 'Item3';
    }), 'Items should contain added item names in correct order');

    // Remove all items
    this.click('.todo-remove');
    this.click('.todo-remove');
    this.click('.todo-remove');

    test.assertElementCount('.todo-list .todo-item', 0, '0 items should remain after removal');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Marks todo items as done', 1, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    // Add item
    this.fill('form.todo-form', {
      todo: 'Item1'
    }, true);

    // Mark item as done
    this.click('.todo-done');

    // Check that item was marked as done
    test.assertExists('.todo-item--done', 'List item should be marked as done');
  });

  casper.run(function() {
    test.done();
  });
});

casper.test.begin('Does not add empty todo items', 1, function suite(test) {
  casper.start('http://localhost:3000/', function() {
    // Submit the form without filling it out
    this.fill('form.todo-form', {}, true);

    test.assertDoesntExist('.todo-list .todo-item', 'List item should not be added for empty todos');
  });

  casper.run(function() {
    test.done();
  });
});
