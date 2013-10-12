/**
 * Call everything from here
 */

var Example = function() {};

Example.prototype = {

	init: function() {
		this.talk();
	},
	talk: function() {
		console.log('Bonsjour');

	}
};

var myExample = new Example();


$(function(){
	masonry.init();
	nav.init();
	//$('.Nav--togglable').roughNavToggle();
});
