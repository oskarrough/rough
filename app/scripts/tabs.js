/*jshint unused:false */
/**
 * Responsive Tabs
 * inspired by Chris Coyer and Bootstrap
 */

var Tab = function() {
	this.init();
};

Tab.prototype = {
	init: function() {
		this.addClasses();
		this.activateFirst();
		this.actions();
	},

	/*
	 * On init, add loaded classes
	 */
	addClasses: function() {
		$('.Tabs').addClass('Tabs--loaded');
	},

	/**
	 * If no element is active on init, activate the first one
	 */
	activateFirst: function() {
		if ($('.Tabs-nav .is-active').length === 0) {
			$('.Tabs-nav li').eq(0).addClass('is-active');
		}
		if ($('.Tabs-item.is-active').length === 0) {
			var pane = $('.Tabs-nav .is-active a').attr('href');
			$(pane).addClass('is-active');
		}
	},

	/**
	 * Toggle the tab items
	 */
	toggleActive: function(e) {
		var $target = $(e.target);
		var pane = $target.attr('href');

		$('.Tabs-nav').toggleClass('is-open');

		$('.is-active').removeClass('is-active');
		$target.parent('li').addClass('is-active');
		$(pane).addClass('is-active');
	},

	/**
	 * Bind actions
	 */
	actions: function() {
		$('.Tabs-nav a').on('click', $.proxy(this.toggleActive, this));
	}
};
