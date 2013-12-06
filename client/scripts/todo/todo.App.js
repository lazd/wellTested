todo.App = function(options) {
	this.el = document.querySelector(options.el);

	this.items = [];

	this.render();
	this.addListeners();
};

todo.App.prototype.render = function() {
	this.el.innerHTML = '<h1 class="todo-heading">todos</h1><div class="todo-page"><form class="todo-form todo-item"><div class="todo-gutter"></div><input class="todo-input" type="text" name="todo"></form><ul class="todo-list"></ul></div>';

	this.list = this.el.querySelector('.todo-list');
	this.form = this.el.querySelector('.todo-form');
	this.input = this.el.querySelector('.todo-input');

	this.items.forEach(this.renderItem.bind(this));
};

todo.App.prototype.renderItem = function(item) {
	// Create a new element or re-use the existing one
	var el = item.el = item.el || document.createElement('li');
	el.className = 'todo-item';
	el.innerHTML = '<div class="todo-gutter"><button class="todo-done"></button></div><input class="todo-input" type="text"><button class="todo-remove"></button>';

	var input = el.querySelector('.todo-input');
	input.value = item.name;
	input.setAttribute('data-todo-id', item.id);

	var doneButton = el.querySelector('.todo-done');
	doneButton.setAttribute('data-todo-id', item.id);

	var removeButton = el.querySelector('.todo-remove');
	removeButton.setAttribute('data-todo-id', item.id);

	this.list.appendChild(el);
};

todo.App.prototype.add = function(name) {
	// Reject todos with invalid names
	if (!todo.util.isValidTodoName(name)) return;

	// Create a new item
	var item = {
		id: todo.util.getUniqueId(),
		name: todo.util.trimTodoName(name),
		done: false
	};

	// Render it
	this.renderItem(item);

	// Store it
	this.items.push(item);

	return item.id;
};

todo.App.prototype.getItem = function(id) {
	var id = parseInt(id);

	for (var i = 0; i < this.items.length; i++) {
		var item = this.items[i];
		if (item.id === id) {
			return item;
		}
	}
	return null;
};

todo.App.prototype.toggleDone = function(id) {
	var item = this.getItem(id);

	if (item) {
		item.done = !item.done;
		if (item.done) {
			item.el.classList.add('todo-item--done');
		}
		else {
			item.el.classList.remove('todo-item--done');
		}
	}
};

todo.App.prototype.remove = function(id) {
	var item = this.getItem(id);

	if (item) {
		this.items.splice(this.items.indexOf(item), 1);

		item.el.parentNode.removeChild(item.el);
	}
};

todo.App.prototype.addListeners = function() {
	this.el.addEventListener('click', this.handleListClick.bind(this), false);
	this.el.addEventListener('change', this.handleItemChange.bind(this), false);
	this.el.addEventListener('submit', this.handleFormSubmit.bind(this), false);
};

todo.App.prototype.handleFormSubmit = function(evt) {
	// Stop form from submitting
	event.preventDefault();

	// Add a new item
	this.add(this.input.value);

	// Clear the form
	this.form.reset();
};

todo.App.prototype.handleListClick = function(event) {
	var target = event.target;
	if (target.classList.contains('todo-done')) {
		var id = target.getAttribute('data-todo-id');
		this.toggleDone(id);
	}
	else if (target.classList.contains('todo-remove')) {
		var id = target.getAttribute('data-todo-id');
		this.remove(id);
	}
};

todo.App.prototype.handleItemChange = function(event) {
	var target = event.target;
	if (target.classList.contains('todo-input')) {
		var id = target.getAttribute('data-todo-id');

		// Only react to change events for existing items
		if (id) {
			var item = this.getItem(id);
			item.name = target.value;
		}
	}
};
