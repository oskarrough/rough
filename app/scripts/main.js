require('lazysizes');
const $ = require('jquery');
const tabs = require('./tabs');
const masonry = require('./rough-masonry');

// on document ready
$(() => {
	tabs();
	masonry();
});
