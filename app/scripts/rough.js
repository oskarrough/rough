var Rough = function() {
	this.init();
};

Rough.prototype = {
	init: function() {
		this.lazyLoading();
	},

	/**
	 * Lazy load of images (and background-images !!)
	 * to use, add the .js-lazyLoad class to an image or read the bLazy documentation
	 */
	lazyLoading: function() {
		var bLazy = new Blazy({
			container: '.Gifs',
			selector: '.Gif',
			offset: 100
		});
	}
};
