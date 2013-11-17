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

	// Check if an element has been sent as argument
	// and if not, use the default
	if (!this.$el) {
		this.$el = $(this.defaults.container);
	} else {
		this.$el = $(el);
	}

	this.init();
};

Masonry.prototype = {

	init: function() {

		if (this.$el.length < 1 ) {
			console.log('Did not find a Masonry container');
			return false;
		}


		this.prepareMarkup();
		this.imagesLoaded();
	},

	prepareMarkup: function() {
		// add els needed by masonry for better fluid calculations
		this.$el.prepend('<div class="Masonry-gridSizer"></div><div class="Masonry-gutterSizer"></div>');
	},

	imagesLoaded: function() {
		// enable masonry after images are loaded (in the callback)
		this.$el.imagesLoaded( $.proxy(this.runMasonry, this) );
	},

	runMasonry: function() {
		this.$el.masonry({
			columnWidth: '.Masonry-gridSizer',
			gutter: '.Masonry-gutterSizer',
			itemSelector: '.Masonry-item'
		}).addClass('is-active');
	}
};
