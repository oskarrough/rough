var $ = require('jquery');
var lazysizes = require('lazysizes'); // this runs by itself
var tabs = require('./tabs');
var masonry = require('./rough-masonry');

// on document ready
$(() => {
	tabs();
	masonry();
});

var css = require('./../styles/vendor.css');
