'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths
	var config = {
		app: 'app',
		dist: 'dist'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project esttings
		config: config,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			gruntfile: {
				files: ['Gruntfile.js']
			},
			// compass: {
			// 	files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
			// 	tasks: ['compass:server', 'autoprefixer']
			// },
			sass: {
				files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['sass:server', 'autoprefixer']
			},
			// nodesass: {
			// 	files: ['app/styles/{,*/}*.scss'],
			// 	tasks: ['nodesass:dist', 'autoprefixer']
			// },
			jade: {
				files: [
					'<%= config.app %>/*.jade',
					'<%= config.app %>/templates/{,*/}*.jade'
				],
				tasks: ['jade:dist']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'{.tmp,<%= config.app %>}/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= config.app %>}/scripts/{,*/}*.js',
					'<%= config.app %>/images/{,*/}*.'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect().use('/bower_components', connect.static('./bower_components')),
							connect.static(config.app)
						];
					}
				}
			},
			dist: {
				options: {
					base: '<%= config.dist %>',
					livereload: false
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*',
						'!<%= config.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= config.app %>/scripts/{,*/}*.js',
				'!<%= config.app %>/scripts/vendor/*'
			]
		},

		// Compiles Sass to CSS
		sass: {
			options: {
				bundleExec: true,
				require: 'susy',
				// loadPath: [
				// 	'app/bower_components'
				// ],
				compass: true,
				precision: 5,
				style: 'nested'
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'app/styles',
					src: ['*.scss'],
					dest: '.tmp/styles',
					ext: '.css'
				}]
			},
			server: {
				files: [{
					expand: true,
					cwd: 'app/styles',
					src: ['*.scss'],
					dest: '.tmp/styles',
					ext: '.css'
				}]
			}
		},

		compass: {
			options: {
				// Makes use of the local Gemfile
				bundleExec: true,
				// … where we have defined the following:
				require: ['susy', 'sass-css-importer'],
				sassDir: '<%= config.app %>/styles',
				cssDir: '.tmp/styles',
				javascriptsDir: '<%= config.app %>/scripts',
				fontsDir: '<%= config.app %>/styles/fonts',
				httpFontsPath: '/styles/fonts',
				importPath: '<%= config.app %>/bower_components',
				imagesDir: '<%= config.app %>/images',
				generatedImagesDir: '.tmp/images/generated',
				httpImagesPath: '../images',
				httpGeneratedImagesPath: '../images/generated',
				relativeAssets: false,
				assetCacheBuster: false
			},
			dist: {
				options: {
					generatedImagesDir: '<%= config.dist %>/images/generated'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

		// Compile sass using node which is way faster but it doesnt support Sass 3.3 (which Susy needs, for instance)
		nodesass: {
			dist: {
				options: {
					outputStyle: 'nested'
				},
				files: {
					'dist/styles/main.css': 'app/styles/main.scss' // 'destination': 'source'
				}
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= config.dist %>/scripts/{,*/}*.js',
						'<%= config.dist %>/styles/{,*/}*.css',
						'<%= config.dist %>/images/{,*/}*.*',
						'<%= config.dist %>/styles/fonts/{,*/}*.*'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				dest: '<%= config.dist %>'
			},
			//html: '<%= config.app %>/index.html'
			html: '.tmp/index.html' // because of jade compile
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
			},
			html: ['<%= config.dist %>/{,*/}*.html'],
			css: ['<%= config.dist %>/styles/{,*/}*.css']
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '**/*.{gif,jpeg,jpg,png}',
					dest: '<%= config.dist %>/images'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= config.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: false,
					removeAttributeQuotes: false,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: false,
					removeOptionalTags: false,
					removeRedundantAttributes: false,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: '<%= config.dist %>',
					src: '{,*/}*.html',
					dest: '<%= config.dist %>'
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= config.app %>',
					dest: '<%= config.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'images/**/*.{webp}',
						'{*./}*.html',
						'styles/fonts/**/*',
						'scripts/vendor/**/*'
					]
				}]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: '<%= config.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			},
			jade: {
				expand: true,
				dot: true,
				cwd: '.tmp/',
				dest: '<%= config.dist %>/',
				src: '{,*/}*.html'
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			server: [
				'sass:server',
				'copy:styles'
			],
			dist: [
				'sass',
				'copy:styles',
				'imagemin',
				'svgmin'
			]
		},

		// Compiles jade to HTML (remember to change grunt tasks that affect HTML)
		jade: {
			dist: {
				options: {
					pretty: true
				},
				files: [{
					expand: true,
					// all src are relative to this path:
					cwd: '<%= config.app %>',
					// choose all jade files except ones in includes or mixins dir
					src: [
						'*.jade'
						//'!**/includes/*.jade',
					],
					dest: '.tmp',
					ext: '.html'
				}]
			}
		}
	});

	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'jade',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('build', [
		'clean:dist',
		'jade',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'concat',
		'cssmin',
		'uglify',
		'copy:dist',
		'copy:jade',
		// 'rev',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'build'
	]);
};
