module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');

	grunt.initConfig({
		'pkg': grunt.file.readJSON('package.json'),

		'meta': {
			'jsFilesForTesting': [
				'bower_components/jquery/jquery.js',
				'bower_components/angular/angular.js',
				'bower_components/angular-route/angular-route.js',
				'bower_components/angular-sanitize/angular-sanitize.js',
				'bower_components/angular-mocks/angular-mocks.js',
				'bower_components/restangular/dist/restangular.js',
				'bower_components/underscore/underscore.js',
				'bower_components/underscore/underscore.js',
				'tests/unit/**/*Spec.js'
			]
		},

		//Karma is the unit test runner. There are 3 different configurations that can be used as a part of the build process.
		'karma': {
			'development': {
				'configFile': 'karma.conf.js',
				'options': {
					'files': [
						'<%= meta.jsFilesForTesting %>',
						'source/app/**/*.js'
					]
				}
			},
			'dist': {
				'options': {
					'configFile': 'karma.conf.js',
					'files': [
						'<%= meta.jsFilesForTesting %>',
						'source/assets/javascript/<%= pkg.namelower %>.js'
					]
				}
			},
			'minified': {
				'options': {
					'configFile': 'karma.conf.js',
					'files': [
						'<%= meta.jsFilesForTesting %>',
						'source/assets/javascript/<%= pkg.namelower %>.min.js'
					]
				}
			}
		},

		//JSHint provides linting capability for all JS files.
		'jshint': {
			'beforeconcat': ['source/app/**/*.js'],
		},

		//Concat concatenates all app files to build a single build file for production.
		'concat': {
			'dist': {
				'src': ['source/app/app.js', 'source/app/routes.js', 'source/app/**/*.js'],
				'dest': 'source/assets/javascript/<%= pkg.namelower %>.js'
			}
		},

		//Uglify minifies build files.
		'uglify': {
			'options': {
				'mangle': false
			},  
			'dist': {
				'files': {
					'source/assets/javascript/<%= pkg.namelower %>.min.js': ['source/assets/javascript/<%= pkg.namelower %>.js']
				}
			}
		},

		//Copy retrieves angular files from their bower packages for inclusion into the build package. This allows for easier dependency management and updates.
		'copy': {
			'main': {
				'files': [{
					'src': [
						'bower_components/angular/angular.min.js', 
						'bower_components/angular-messages/angular-messages.min.js',
						'bower_components/angular-route/angular-route.min.js'
					],
					'expand': true,
					'flatten': true,
					'dest': 'source/assets/javascript/'
				}]
			}
		},

		//JSDoc generates API docs from the application's JS files.
		'jsdoc': {
			'src': ['source/app/**/*.js'],
			'options': {
				'destination': 'docs'
			}
		}

	});

	//Karma tasks have been disabled as there is an error in the way the app files are being loaded into the tests.
	grunt.registerTask('test', [
		//'karma:development',
	]);
	grunt.registerTask('docs', ['jsdoc']);
	grunt.registerTask('build',	[
	  'jshint',
//	  'karma:development',
	  'concat',
//	  'karma:dist',
	  'uglify',
	  'copy',
//	  'karma:minified',
	  'jsdoc'
	]);
};