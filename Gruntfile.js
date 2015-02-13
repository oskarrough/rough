module.exports = function(grunt) {

	grunt.initConfig({
		grunticon: {
			// 'files' is a set of icons we can define more sets if we need
			files: {
				files: [{
					expand: true,
					cwd: 'app/images/icons',
					src: ['*.svg', '*.png'],
					dest: '.tmp/images/icons'
				}],
				options: {
					enhanceSVG: true
				}
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-grunticon');

	// Register tasks
	grunt.registerTask('icons', ['grunticon']);
	grunt.registerTask('default', ['icons']);
};

