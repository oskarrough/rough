$(function(){
	console.log('It is working.');
	$('.Nav--togglable').roughNavToggle();
});

window.onload = function() {
	new StickyTitles( $('.Title') );
};