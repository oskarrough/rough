var $ = require('jquery');
var Masonry = require('masonry-layout');
var imagesLoaded = require('imagesLoaded');

// Dynamic grid with Masonry

var RoughMasonry = {
	isFirstRun: true,

	init() {

		// Only run if the container exists
		if (!this.$el.length) {
			return false;
		}

		// Only needed if your items have percentage/fluid widths
		if (this.isFirstRun) {
			this.$el.prepend('<div class="Masonry-gridSizer"></div><div class="Masonry-gutterSizer"></div>');
			this.isFirstRun = false;
		}

		// Run after images are loaded
		imagesLoaded(this.$el, $.proxy(this.runMasonry, this));
	},

	runMasonry() {
		// get the plain javascript element
		var elem = this.$el[0];
		var msnry = new Masonry(elem, {
			itemSelector: '.Masonry-item',
			gutter: '.Masonry-gutterSizer',
			columnWidth: '.Masonry-gridSizer'
		});

		this.$el.addClass('is-active');
		this.fadeInItems();

		// layout again
		// this.$el.masonry();

		// layout again after all images are loaded
		// this.$el.imagesLoaded( function(){
		// 	this.$el.masonry();
		// });
	},

	/**
	 * Fade in items one after another as the images load
	 * remember to add the corresponding css
	 */
	fadeInItems() {
		var $items = this.$el.find('.Masonry-item');
		$items.each(function(index, el) {
			imagesLoaded(el, function() {
				$(el).addClass('is-loaded');
			});
		});
	}
};

module.exports = function(el, options) {

	// Defaults:
	RoughMasonry.defaults = {
		container: '#Masonry'
	};

	// Extending options:
	RoughMasonry.opts = $.extend({}, RoughMasonry.defaults, options);

	// If an element was passed, use it, otherwise use a default el
	if (el) {
		RoughMasonry.$el = $(el);
	} else {
		RoughMasonry.$el = $(RoughMasonry.defaults.container);
	}

	RoughMasonry.init();
};
