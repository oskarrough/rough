//
// Dynamic grid with Masonry
//

$(function () {
	
	var $container = $('.js-masonry');
	if ($container.length > 0) {

		console.log('hej');

		$container.prepend('<div class="grid-sizer"></div><div class="gutter-sizer"></div>');
		
		// $container.imagesLoaded( function() {
		// 	$container.masonry({
		// 		columnWidth: '.grid-sizer',
		// 		gutter: '.gutter-sizer',
		// 		itemSelector: '.Teaser'
		// 	});
		// });
	}

});