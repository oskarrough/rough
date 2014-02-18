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

	// Define the configuration for all the tasks
	grunt.initConfig({
		yeoman: {
			app: 'app',
			dist: 'dist'
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			gruntfile: {
				files: ['Gruntfile.js']
			},
			compass: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass:server', 'autoprefixer']
			},
			styles: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			jade: {
				files: [
					'<%= yeoman.app %>/*.jade',
					'<%= yeoman.app %>/views/{,*/}*.jade'
				],
				tasks: ['jade:dist']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'{.tmp,<%= yeoman.app %>}/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
					'<%= yeoman.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: [
						'.tmp',
						'<%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					open: true,
					base: '<%= yeoman.dist %>',
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
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp',
			'gh-pages': '.grunt'
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js',
				'!<%= yeoman.app %>/scripts/vendor/*'
			]
		},
		compass: {
			options: {
				// Makes use of the local Gemfile
				bundleExec: true,
				// … where we have defined the following:
				require: ['breakpoint', 'susy', 'sass-css-importer'],
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/styles/fonts',
				httpFontsPath: '/styles/fonts',
				importPath: '<%= yeoman.app %>/bower_components',
				imagesDir: '<%= yeoman.app %>/images',
				generatedImagesDir: '.tmp/images/generated',
				httpImagesPath: '../images',
				httpGeneratedImagesPath: '../images/generated',
				relativeAssets: false,
				assetCacheBuster: false
			},
			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/images/generated'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['last 2 versions']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		// Automatically inject Bower components into the HTML file
		'bower-install': {
			app: {
				html: '<%= yeoman.app %>/index.html',
				ignorePath: '<%= yeoman.app %>/'
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{gif,jpeg,jpg,png,webp}',
						'<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				dest: '<%= yeoman.dist %>'
			},
			//html: '<%= yeoman.app %>/index.html'
			html: '.tmp/index.html' // because of jade compile
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
			},
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '**/*.{gif,jpeg,jpg,png}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: '{,*/}*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		// By default, your `index.html`'s <!-- Usemin block --> will take care of
		// minification. These next options are pre-configured if you do not wish
		// to use the Usemin blocks.
		// cssmin: {
		//     dist: {
		//         files: {
		//             '<%%= yeoman.dist %>/styles/main.css': [
		//                 '.tmp/styles/{,*/}*.css',
		//                 '<%%= yeoman.app %>/styles/{,*/}*.css'
		//             ]
		//         }
		//     }
		// },
		// uglify: {
		//     dist: {
		//         files: {
		//             '<%%= yeoman.dist %>/scripts/scripts.js': [
		//                 '<%%= yeoman.dist %>/scripts/scripts.js'
		//             ]
		//         }
		//     }
		// },
		// concat: {
		//     dist: {}
		// },

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
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
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			},
			jade: {
				expand: true,
				dot: true,
				cwd: '.tmp/',
				dest: '<%= yeoman.dist %>/',
				src: '{,*/}*.html'
			}
		},
		concurrent: {
			server: [
				'compass:server',
				'copy:styles'
			],
			dist: [
				'compass',
				'copy:styles',
				'imagemin',
				'svgmin',
				'htmlmin'
			]
		},
		'gh-pages': {
			options: {
				base: 'dist'
			},
			src: [
				'index.html',
				'styleguide.html',
				'images/**/*',
				'scripts/**/*',
				'styles/**/*'
			]
		},
		jade: {
			dist: {
				options: {
					pretty: true
				},
				files: [{
					expand: true,
					// all src are relative to this path:
					cwd: '<%= yeoman.app %>',
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
		'rev',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'build'
	]);
};
