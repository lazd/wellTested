casper.start('http://localhost:3000/')
.then(function() {
  phantomcss.screenshot('#todo-app', 'Main app');
})
.then(function() {
  this.fill('form.todo-form', {
    todo: 'Item1'
  }, true);

  phantomcss.screenshot('#todo-app', 'Item added');
})
.then(function() {
  this.click('.todo-done');

  phantomcss.screenshot('#todo-app', 'Item checked off');
});
