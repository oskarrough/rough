/*jshint unused:false */

/**
 * Sample markup:
 * .Video
 *		iframe#fullscreenVideo(src="http://player.vimeo.com/video/48697184?autoplay=1&amp;badge=0&amp;byline=0&amp;loop=1&amp;portrait=0&amp;title=0&amp;api=1" width="900" height="505" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen)
 */

/**
 * Vimeo resize script for fullwidth display
 */
var Video = function() {
	this.init();
};

Video.prototype = {
	$player: $('#fullscreenVideo'),

	init() {
		var that = this;
		that.resizeVideo();
		$(window).resize(function() {
			that.resizeVideo();
		});
	},

	resizeVideo() {
		if ($('#fullscreenVideo').length >= 1) {
			var videoWidth = $('#fullscreenVideo').attr('width');
			var videoHeight = $('#fullscreenVideo').attr('height');
			var viewportWidth = $(window).width();
			// var viewportHeight = $(window).height();
			$('#fullscreenVideo').css('width', '100%');
			$('#fullscreenVideo').height(viewportWidth / videoWidth * videoHeight);
		}
	}
};
