module.exports = function(grunt) {

	// Load tasks
	grunt.loadNpmTasks('grunt-grunticon');

	grunt.initConfig({
		grunticon: {

			// 'files' is a set of icons. If needed we can define more sets
			files: {
				files: [{
					expand: true,
					cwd: 'app/images/icons',
					src: ['*.svg', '*.png'],
					dest: '.tmp/images/icons'
				}],
				options: {

					// This parses markup for icons that should be embedded at runtime
					// example: <i class="icon-logo" data-grunticon-embed></i>
					enhanceSVG: true
				}
			}
		}
	});

	// Register tasks
	grunt.registerTask('icons', ['grunticon']);
	grunt.registerTask('default', ['icons']);
};
