/*global masonry,nav*/
/**
 * Call everything from here
 */

$(function(){
	masonry.init();
	nav.init();
	$('.Nav--togglable').roughNavToggle();
});
