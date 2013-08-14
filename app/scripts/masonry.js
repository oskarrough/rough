//
// Dynamic grid with Masonry
//

// choose the container for the grid
var container = document.getElementById('Masonry');

// @todo: rewrite this, dont wrap everything in a conditional
// only run if the container exists
if ($(container).length > 0) {

	// insert elements masonry needs for better fluid measurements
	$(container).prepend('<div class="grid-sizer"></div><div class="gutter-sizer"></div>');

	//$(function () {

		// enable masonry after images are loaded
		imagesLoaded(container, function() {
			var msnry = new Masonry( container, {
				columnWidth: '.grid-sizer',
				gutter: '.gutter-sizer',
				itemSelector: '.Article'
			});
		});

	//});

}
