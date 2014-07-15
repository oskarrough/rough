/*jshint unused:false */

/**
 * Responsive Tabs
 * based on Bootstrap's tabs
 * and Chris Coyer's pen http://codepen.io/chriscoyier/pen/gHnGD
 */

/**
 * Resposive tab solution
 */
var Tab = function() {
	this.init();
};

Tab.prototype = {

	init: function() {
		this.activateFirst();
		this.actions();
	},
	/*
	* if no element is active on init, activate the first one
	*/
	activateFirst: function() {
		if($('.Tabs-nav .Tabs-is-active').length === 0) {
			$('.Tabs-nav li').eq(0).addClass('Tabs-is-active');
		}
		if($('.Tabs-item.Tabs-is-active').length === 0) {
			var pane = $('.Tabs-nav .Tabs-is-active a').attr('href');
			$(pane).addClass('Tabs-is-active');
		}
	},
	/*
	* toggle the tab items
	*/
	toggleActive: function(e) {
		var $target = $(e.target);
		var pane = $target.attr('href');

		$('.Tabs-nav').toggleClass('Tabs-is-open');

		$('.Tabs-is-active').removeClass('Tabs-is-active');
		$target.parent('li').addClass('Tabs-is-active');
		$(pane).addClass('Tabs-is-active');
	},
	/*
	* bind actions
	*/
	actions: function() {
		$('.Tabs-nav a').on('click', $.proxy(this.toggleActive, this));
	}

};