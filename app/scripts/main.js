var $ = require('jquery');
var lazysizes = require('lazysizes'); // this runs by itself
var tabs = require('./tabs');
var masonry = require('./rough-masonry');
var css = require('./../styles/vendor.css');

// on document ready
$(() => {
	tabs();
	masonry();
});
