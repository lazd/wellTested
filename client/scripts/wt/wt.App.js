wt.App = function(options) {
	this.el = document.querySelector(options.el);

	this.items = [];

	this.render();
	this.addListeners();
};

wt.App.prototype.render = function() {
	this.el.innerHTML = '<h1 class="wt-heading">Well-Tested</h1><p class="wt-empty">No items.</p><ul class="wt-list"></ul><form class="wt-new"><input type="text" name="item"><button>Submit</button></form>';

	this.list = this.el.querySelector('.wt-list');
	this.form = this.el.querySelector('form.wt-new');
	this.input = this.el.querySelector('input[name=item]');
	this.emptyMessage = this.el.querySelector('.wt-empty');

	this.items.forEach(this.renderItem.bind(this));
};

wt.App.prototype.renderItem = function(name) {
	this.emptyMessage.style.display = 'none';

	var li = document.createElement('li');
	li.className = 'wt-item';
	li.innerHTML = '<button class="wt-remove">&times;</button><label></label>';

	li.setAttribute('data-name', name);

	var label = li.querySelector('label');
	label.textContent = name;

	this.list.appendChild(li);
};

wt.App.prototype.add = function(name) {
	if (!name) return;

	this.items.push(name);

	this.renderItem(name);
};

wt.App.prototype.remove = function(el) {
	var name = el.getAttribute('data-name');
	var index = this.items.indexOf(name);
	if (index !== -1) {
		this.items.splice(index, 1);
	}

	el.parentNode.removeChild(el);

	if (this.items.length === 0) {
		this.emptyMessage.style.display = '';
	}
};

wt.App.prototype.addListeners = function() {
	this.el.addEventListener('click', this.handleListClick.bind(this), false);
	this.form.addEventListener('submit', this.handleFormSubmit.bind(this), false);
};

wt.App.prototype.handleFormSubmit = function(evt) {
	// Stop form from submitting
	event.preventDefault();

	// Add a new item
	this.add(this.input.value);

	// Clear the form
	this.form.reset();
};

wt.App.prototype.handleListClick = function(event) {
	if (event.target.classList.contains('wt-remove')) {
		this.remove(event.target.parentNode);
	}
};
