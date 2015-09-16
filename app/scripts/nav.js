const $ = require('jquery');

/**
 * Scroll navigation
 */

const nav = {
	$nav: $('.js-genenav'),
	$sections: $('.Section'),

	init() {
		this.generateNav();
		this.waypoints();
		this.actions();
	},

	/**
	 * Generates a link to the $nav from every .Section
	 * It takes the title from the ID
	 */
	generateNav() {
		this.$sections.each((index, element) => {
			const id = $(element).attr('id');
			if (id) {
				this.$nav.append(`<li><a href="#${id}">${id}</a></li>`);
			}
		});
	},

	/**
	 * Change active link depending on scroll position
	 */
	waypoints() {
		this.$sections.waypoint(direction => {
			const $links = $(`a[href="#${this.id}"]`);
			$links.toggleClass('is-active', direction === 'down');
		}, {
			// when to consider the section as 'in viewport'
			offset: '85%'
		}).waypoint(direction => {
			const $links = $(`a[href="#${this.id}"]`);
			$links.toggleClass('is-active', direction === 'up');
		}, {
			offset() {
				return -$(this).height();
			}
		});
	},

	/**
	 * Smooth scrolling instead of jumping
	 */
	jump(event) {
		const $active = $(event.currentTarget);
		const offset = $($active.attr('href')).offset();
		$('html, body').animate({
			scrollTop: offset.top
		}, 200, () => {
			// done jumping
		});
	},

	actions() {
		this.$nav.find('a').on('click', this.jump);
	}
};

module.exports = nav;
