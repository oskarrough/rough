/**
 * Dynamic grid with Masonry
 */

var DynamicGrid = function() {};

DynamicGrid.prototype = {

	$container: $('#Masonry'),

	init: function() {
		this.$container.prepend('<div class="Masonry-gridSizer"></div><div class="Masonry-gutterSizer"></div>');

		// enable masonry after images are loaded
		this.$container.imagesLoaded(this.runMasonry());
	},

	runMasonry: function() {
		this.$container.masonry({
			columnWidth: '.Masonry-gridSizer',
			gutter: '.Masonry-gutterSizer',
			itemSelector: '.Masonry-item'
		}).addClass('is-active');
	}
};

var dynamicGrid = new DynamicGrid();

// DO IT
dynamicGrid.init();
