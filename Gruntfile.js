/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Task configuration.
		jshint: {
			options: {
				"devel": true,
				"curly": true,
				"eqeqeq": true,
				"immed": true,
				"latedef": true,
				"newcap": true,
				"noarg": true,
				"sub": true,
				"undef": true,
				"unused": true,
				"boss": true,
				"eqnull": true,
				"browser": true,
				"globals": {
					"require": true,
					"module": true
				},
				// "reporter": "jslint",
				// "reporterOutput": "jslint_report.xml",
				"ignores": ['test/temp/**/*.js', './**/templates/**/*.js']
			},

			gruntfile: {
				src: 'Gruntfile.js'
			},

			test: {
				src: ['lib/**/*.js', 'test/**/*.js']
			},

			generators: {
				src: ['app/**/*.js', 'facelessComponent/**/*.js', 'uiComponent/**/*.js', 'view/**/*.js']
			}
		},



		mochaTest: {
			test: {
				src: ['test/*.js']
			}
		},



		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},

			test: {
				files: '<%= jshint.lib_test.src %>',
				tasks: ['jshint:test']
			},

			generators: {
				files: '<%= jshint.generators.src %>',
				tasks: ['jshint:generators']
			}
		},
	});



	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-release'); // use grunt release (= release:patch), release:minor, release:major


	// Default task.
	grunt.registerTask('default', ['jshint', 'mochaTest']);


};