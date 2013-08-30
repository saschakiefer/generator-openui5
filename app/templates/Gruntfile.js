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
					"jQuery": true,
					"sap": true,
					"$": true,
					"util": true,
					"view": true,
					"model": true
				},
				// Uncomment the following lines, if you want the lint results beign generatedt to a file
				// "reporter": "jslint",
				// "reporterOutput": "jslint_report.xml",
				"ignores": []
			},

			gruntfile: {
				src: 'Gruntfile.js'
			},
			libTest: {
				src: ['lib/**/*.js', 'test/**/*.js']
			},
			application: {
				src: ['model/**/*.js', 'util/**/*.js', 'view/**/*.js', 'Application.js']
			}
		},


		qunit: {
			all: {
				src: ['test/**/*.html']
			}
		},


		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			libTest: {
				files: '<%= jshint.libTest.src %>',
				tasks: ['jshint:lib_test', 'qunit']
			},
			application: {
				files: '<%= jshint.application.src %>',
				tasks: ['collaboration']
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', ['jshint', 'qunit:all', 'watch']);
};