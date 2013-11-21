wt.App = function(options) {
	this.el = document.querySelector(options.el);

	this.addListeners();
	this.render();
};

wt.App.prototype.addListeners = function() {
	this.el.addEventListener('click', function(event) {
		if (event.target.classList.contains('wt-remove'))
			this.remove(event.target.parentNode);
	}.bind(this));
};

wt.App.prototype.render = function() {
	this.el.innerHTML = '<h1>Well-Tested</h1><ul class="wt-list"></ul>';

	this.list = this.el.querySelector('.wt-list');
};

wt.App.prototype.add = function(name) {
	var li = document.createElement('li');
	li.innerHTML = '<button class="wt-remove">&times;</button><label></label>';

	var label = li.querySelector('label');
	label.textContent = name;

	this.list.appendChild(li);
};
