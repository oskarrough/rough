/*jshint unused:false */
/**
 * Scroll navigation
 */

var Nav = function() {};

Nav.prototype = {

	$nav: $('.js-genenav'),
	$sections: $('.Section'),

	init: function() {
		this.generateNav();
		this.waypoints();
		this.bindEvents();
	},


	/**
	 * Generate a link from every .Section with an ID on the page
	 */

	generateNav: function(){
		var self = this;

		this.$sections.each(function(){
			var myID = $(this).attr('id');
			if (myID) {
				self.$nav.append('<li><a href="#'+myID+'"> '+myID+' </a></li>');
			}
		});
	},


	/**
	 * Change active link depending on scroll position
	 */

	waypoints: function(){
		this.$sections.waypoint(function(direction) {
			var $links = $('a[href="#' + this.id + '"]');
			$links.toggleClass('is-active', direction === 'down');
		}, {
			offset: '85%' // when to consider the section as 'in viewport'
		}).waypoint(function(direction) {
			var $links = $('a[href="#' + this.id + '"]');
			$links.toggleClass('is-active', direction === 'up');
		}, {
			offset: function() {
				return -$(this).height();
			}
		});

		// make sure waypoints are correct
		//$.waypoints('refresh');
	},


	/**
	 * Smooth scrolling instead of jumping
	 */

	jump: function(event) {
		var $active = $(event.currentTarget);
		var offset = $( $active.attr('href') ).offset();
		$('html, body').animate({
			scrollTop: offset.top
		}, 200, function() {
			// callback
		});
	},

	bindEvents: function() {
		this.$nav.find('a').on('click', this.jump);
	}

};

var nav = new Nav();
