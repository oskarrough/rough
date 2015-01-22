module.exports = function(grunt) {

	grunt.initConfig({

		grunticon: {
			// 'myIcons' is a set of icons we can define more sets if we need
			myIcons: {
				files: [{
					expand: true,
					cwd: 'app/images/icons',
					src: ['*.svg', '*.png'],
					dest: '.tmp/images/icons'
				}],
				options: {}
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-grunticon');

	// Register tasks
	grunt.registerTask('default', ['grunticon']);
};

