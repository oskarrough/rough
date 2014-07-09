/*jshint unused:false */

/**
 * Dynamic grid with Masonry
 */
var Masonry = function(el, options) {

	// Defaults:
	this.defaults = {
		container: '#Masonry'
	};

	// Extending options:
	this.opts = $.extend({}, this.defaults, options);

	// If an element was passed, use it, otherwise use a default el
	if (el) {
		this.$el = $(el);
	} else {
		this.$el = $(this.defaults.container);
	}

	this.init();
};

Masonry.prototype = {
	isFirstRun: true,

	init: function() {

		// Only run if the container exists
		if (this.$el.length < 1 ) {
			console.log('Did not find a Masonry container');
			return false;
		}

		// Make sure we don't get duplicate markup
		if (this.isFirstRun) {
			this.prepareMarkup();
		}

		// First run after images are loaded
		this.$el.imagesLoaded( $.proxy(this.runMasonry, this) );
		// this.runMasonry();
	},

	// Add els needed by masonry for better fluid calculations
	prepareMarkup: function() {
		this.$el.prepend('<div class="Masonry-gridSizer"></div><div class="Masonry-gutterSizer"></div>');
		this.isFirstRun = false;
	},

	runMasonry: function() {
		this.$el.masonry({
			columnWidth: '.Masonry-gridSizer',
			gutter: '.Masonry-gutterSizer',
			itemSelector: '.Masonry-item'
		}).addClass('is-active');

		this.$el.masonry();
	}
};
