/*jshint unused:false */
/**
 * Scroll navigation
 */

var Goeuro = function() {
	this.init();
};

Goeuro.prototype = {
	$sections: $('.Section'),
	$nav: $('.SectionBarNav'),
	navHeight: null,

	init: function() {
		// set the height of the nav bar
		this.navHeight = this.$nav.height();

		this.actions();
		this.waypoints();
		this.setSectionHeights();
	},

	actions: function() {
		// internal links to scroll/jump the page
		this.$nav.find('a').on('click', $.proxy(this.jump, this));

		// Debounce the resize event so it doesn't run while the window size is in flux
		var lazyLayout = _.debounce(this.setSectionHeights.bind(this), 400);
		$(window).resize(lazyLayout);
	},

	/**
	 * Change active link depending on scroll position
	 */
	waypoints: function(){
		var self = this;

		// Sticky section bar anv
		$('.SectionBarNav').waypoint('sticky', {
			stuckClass: 'is-sticky',
		});

		this.$sections.waypoint(function(direction) {
			var $links = $('a[href="#' + this.id + '"]');
			$links.toggleClass('is-active', direction === 'down');
		}, {
			offset: self.navHeight // when to consider it 'in viewport'
		}).waypoint(function(direction) {
			var $links = $('a[href="#' + this.id + '"]');
			$links.toggleClass('is-active', direction === 'up');
		}, {
			offset: function() {
				return -$(this).height() + self.navHeight; // when to consider it 'out of viewport'
			}
		});

		// make sure waypoints are correct
		// shouldn't be necessary but here it is, should you need it
		// $.waypoints('refresh');
	},


	/**
	 * Smooth scrolling instead of jumping
	 */
	jump: function(event) {
		var self = this;

		var $active = $(event.currentTarget);
		var offset = $( $active.attr('href') ).offset();
		$('html, body').animate({
			scrollTop: offset.top
		}, 500, function() {
			// callback
		});
	},

	// Set the height of sections to fill the viewport
	setSectionHeights: function() {
		$('.Section--heightControl').css({
			height: $(window).height()
		});
	}
};

// Run it
var goeuro = new Goeuro();
