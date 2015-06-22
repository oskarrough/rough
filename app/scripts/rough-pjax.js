var RoughPjax = function() {
	if ($.support.pjax) {
		this.init();
	}
};

RoughPjax.prototype = {
	container: '#SiteMain',
	$container: $('#SiteMain'),
	speed: 100,
	debug: true,

	init: function() {
		this.actions();
	},
	actions: function() {
		// user clicks link with pjax class
		$(document).delegate('a.pjax', 'click', this.pjaxClick.bind(this));

		// bind pjax events to our custom ones
		this.$container
			.on('pjax:start', this.pjaxStart.bind(this))
			.on('pjax:end', this.pjaxEnd.bind(this))
			.on('pjax:send', this.pjaxSend.bind(this))
			.on('pjax:beforeReplace', this.pjaxBeforeReplace.bind(this))
			.on('pjax:complete', this.pjaxComplete.bind(this));
	},

	pjaxClick: function(event) {
		event.preventDefault();
		var url = event.currentTarget.href;

		$('html').addClass('is-loading');

		// also stops the link from working normally
		this.animateOut(url);
	},

	animateOut: function(url) {
		if (this.debug) { console.log('animateOut'); }
		// Here you can animate out
		this.$container.fadeOut(this.speed, function() {
			this.didAnimateOut(url);
		}.bind(this));
	},

	didAnimateOut: function(url) {
		var self = this;

		if (this.debug) { console.log('didAnimateOut'); }
		// Because we first trigger pjax here in the callback
		// https://github.com/defunkt/jquery-pjax#pjax-options
		$.pjax({
			url: url,
			container: self.container,
			fragment: self.container
		});
	},

	pjaxStart: function() {
		if (this.debug) { console.log('start'); }
	},
	pjaxSend: function() {
		if (this.debug) { console.log('send'); }
	},
	pjaxBeforeReplace: function() {
		if (this.debug) { console.log('beforeReplace'); }
	},
	pjaxComplete: function() {
		if (this.debug) { console.log('complete'); }
		$('html').removeClass('is-loading');
	},
	pjaxEnd: function() {
		if (this.debug) { console.log('end'); }
		// fade in the main content
		this.animateIn();
	},

	animateIn: function() {
		if (this.debug) { console.log('animateIn'); }
		// Here you can animate In
		this.$container.fadeIn(this.speed, function() {
			this.didAnimateIn();
		}.bind(this));
	},

	didAnimateIn: function() {
		if (this.debug) { console.log('didAnimateIn'); }
		// functions loaded again after pjax ends go here
	}
};
