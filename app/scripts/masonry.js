/*jshint unused:false */
/**
 * Dynamic grid with Masonry
 */

var Masonry = function() {};

Masonry.prototype = {

	$container: $('#Masonry'),

	init: function() {

		// add els needed by masonry for better fluid calculations
		this.$container.prepend('<div class="Masonry-gridSizer"></div><div class="Masonry-gutterSizer"></div>');

		// enable masonry after images are loaded
		this.$container.imagesLoaded( this.runMasonry() );
	},

	runMasonry: function() {
		this.$container.masonry({
			columnWidth: '.Masonry-gridSizer',
			gutter: '.Masonry-gutterSizer',
			itemSelector: '.Masonry-item'
		}).addClass('is-active');
	}
};

var masonry = new Masonry();
