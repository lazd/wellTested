wt.App = function(options) {
	this.el = document.querySelector(options.el);

	this.addListeners();
	this.render();
};

wt.App.prototype.addListeners = function() {
	this.el.addEventListener('click', this.handleListClick, false);
};

wt.App.prototype.handleListClick = function(event) {
	if (event.target.classList.contains('wt-remove')) {
		this.remove(event.target.parentNode);
	}
};

wt.App.prototype.render = function() {
	this.el.innerHTML = '<h1>Well-Tested</h1><ul class="wt-list"><li class="wt-empty">No items.</li></ul>';

	this.list = this.el.querySelector('.wt-list');
};

wt.App.prototype.add = function(name) {
	var li = document.createElement('li');
	li.innerHTML = '<button class="wt-remove">&times;</button><label></label>';

	var label = li.querySelector('label');
	label.textContent = name;

	this.list.appendChild(li);
};

wt.App.prototype.remove = function(el) {
	el.parentNode.removeChild(el);
};
