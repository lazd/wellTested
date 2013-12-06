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

todo.App.prototype.renderItem = function(name) {
	var li = document.createElement('li');
	li.className = 'todo-item';
	li.innerHTML = '<div class="todo-gutter"><button class="todo-remove"></button></div><label class="todo-label"></label>';

	li.setAttribute('data-name', name);

	var label = li.querySelector('label');
	label.textContent = name;

	this.list.appendChild(li);
};

todo.App.prototype.add = function(name) {
	if (!name) return;

	this.items.push(name);

	this.renderItem(name);
};

todo.App.prototype.remove = function(el) {
	var name = el.getAttribute('data-name');
	var index = this.items.indexOf(name);
	if (index !== -1) {
		this.items.splice(index, 1);
	}

	el.parentNode.removeChild(el);
};

todo.App.prototype.addListeners = function() {
	this.el.addEventListener('click', this.handleListClick.bind(this), false);
	this.form.addEventListener('submit', this.handleFormSubmit.bind(this), false);
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
	if (event.target.classList.contains('todo-remove')) {
		this.remove(event.target.parentNode.parentNode);
	}
};
