//
// Scroll navigation
//

function jump(event) {
	var $active = $(event.currentTarget);
	var offset = $( $active.attr('href') ).offset().top;
	$('html, body').animate({
		scrollTop: offset
	}, 150, function() {
	});
}

$(function() {

	// Nav highlighting
	$('.Section')
	.waypoint(function(direction) {
		var $links = $('a[href="#' + this.id + '"]');
		$links.toggleClass('is-active', direction === 'down');

	}, {
		//context: '.l-Primary',
		offset: '70%'
	})
	.waypoint(function(direction) {
		var $links = $('a[href="#' + this.id + '"]');
		$links.toggleClass('is-active', direction === 'up');
	}, {
		//context: '.l-Primary',
		offset: function() {
			return -$(this).height();
		}
	});
	// make sure waypoints are correct
	$.waypoints('refresh');


	/* Generate a menu from the content on the page */
	var $nav = $('.js-genenav');
	$('.Section').each(function(){
		var myID = $(this).attr('id');
		if (myID) {
			$nav.append('<li><a href="#'+myID+'"> '+myID+' </a></li>');
		}
	});

	/* Smooth scrolling instead of jumping */
	$nav.find('a').on('click', jump);
});
