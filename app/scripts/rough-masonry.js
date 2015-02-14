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
		if (!this.$el.length) {
			return false;
		}

		// Only needed if your items have percentage/fluid widths
		if (this.isFirstRun) {
			this.$el.prepend('<div class="Masonry-gridSizer"></div><div class="Masonry-gutterSizer"></div>');
			this.isFirstRun = false;
		}

		// Run after images are loaded
		this.$el.imagesLoaded( $.proxy(this.runMasonry, this) );
	},

	runMasonry: function() {
		this.$el.masonry({
			itemSelector: '.Masonry-item',
			gutter: '.Masonry-gutterSizer', // replace with a number if you have fixed widths
			columnWidth: '.Masonry-gridSizer' // replace with a number if you have fixed widths
		}).addClass('is-active');

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
	fadeInItems: function() {
		var $items = this.$el.find('.Masonry-item');
		$items.each(function(index, el){
			$(this).imagesLoaded( function() {
				$(el).addClass('is-loaded');
			});
		});
	}
};
