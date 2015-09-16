const $ = require('jquery');

/**
 * Responsive Tabs
 * inspired by Chris Coyer and Bootstrap
 */

const tabs = {
	init() {
		if (!$('.Tabs').length) {
			return false;
		}

		this.addClasses();
		this.activateFirst();
		this.actions();
	},

	// On init, add loaded classes
	addClasses() {
		$('.Tabs').addClass('Tabs--loaded');
	},

	// If no element is active on init, activate the first one
	activateFirst() {
		if ($('.Tabs-nav .is-active').length === 0) {
			$('.Tabs-nav li').eq(0).addClass('is-active');
		}
		if ($('.Tabs-item.is-active').length === 0) {
			const pane = this.anker($('.Tabs-nav .is-active a').attr('href'));
			$(pane).addClass('is-active');
		}
	},

	// Toggle the tab items
	toggleActive(event) {
		event.preventDefault();
		const $target = $(event.target);
		const pane = this.anker($target.attr('href'));

		$('.Tabs-nav').toggleClass('is-open');
		$('.is-active').removeClass('is-active');
		$target.parent('li').addClass('is-active');
		$(pane).addClass('is-active');
	},

	anker(url) {
		return `#${url.split('#')[1]}`;
	},

	// Bind actions
	actions() {
		$('.Tabs-nav a').on('click', $.proxy(this.toggleActive, this));
	}
};

module.exports = tabs;
