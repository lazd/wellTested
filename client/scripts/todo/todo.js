var todo = {
  init: function() {
    console.log('Starting todo app...');
    todo.app = new todo.App({
      el: '#todo-app'
    });
  }
};
