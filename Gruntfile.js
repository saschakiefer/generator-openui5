/*global module:false, require */
var semver = require("semver");

module.exports = function(grunt) {
	"use strict";

	// Load all plugins
	require("load-grunt-tasks")(grunt);


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
				"ignores": ["test/temp/**/*.js", "./**/templates/**/*.js"],
				"quotmark": "double"
			},

			gruntfile: {
				src: "Gruntfile.js"
			},


			util: {
				src: "./*.js"
			},

			test: {
				src: "test/**/*.js"
			},

			generators: {
				src: ["app/**/*.js", "facelessComponent/**/*.js", "uiComponent/**/*.js", "view/**/*.js"]
			}
		},


		mochaTest: {
			test: {
				src: ["test/*.js"]
			}
		},


		// Note: use Ctrl-C to terminate a watch task!
		watch: {
			gruntfile: {
				files: "<%= jshint.gruntfile.src %>",
				tasks: ["jshint:gruntfile"]
			},

			test: {
				files: "<%= jshint.test.src %>",
				tasks: ["jshint:test"]
			},

			generators: {
				files: "<%= jshint.generators.src %>",
				tasks: ["jshint:generators"]
			},

			default: {
				files: "<%= jshint.generators.src %>",
				tasks: ["jshint:generators", "mochaTest"],
				options: {
					interrupt: true,
				},
			},

			util: {
				files: "<%= jshint.util.src %>",
				tasks: ["jshint:generators"]
			}
		},

		pkg: grunt.file.readJSON("package.json"),

		changelog: {
			options: {
				dest: "CHANGELOG.md",
				versionFile: "package.json"
			}
		},


		release: {
			options: {
				commitMessage: "<%= version %>",
				tagName: "<%= version %>",
				bump: false, // we have our own bump
				file: "package.json",
				add: false, //default: true
				commit: false, //default: true
				tag: false, //default: true
				push: false, //default: true
				pushTags: false, //default: true
				npm: true, //default: true
				npmtag: true, //default: no tag
			}
		},


		stage: {
			options: {
				files: ["CHANGELOG.md"]
			}
		}
	});



	grunt.registerTask("bump", "bump manifest version", function(type) {
		var options = this.options({
			file: grunt.config("pkgFile") || "package.json"
		});

		function setup(file, type) {
			var pkg = grunt.file.readJSON(file);
			var newVersion = pkg.version = semver.inc(pkg.version, type || "patch");
			return {
				file: file,
				pkg: pkg,
				newVersion: newVersion
			};
		}

		var config = setup(options.file, type);
		grunt.file.write(config.file, JSON.stringify(config.pkg, null, "  ") + "\n");
		grunt.log.ok("Version bumped to " + config.newVersion);
	});



	// Default task.
	grunt.registerTask("default", ["jshint", "mochaTest"]);
	grunt.registerTask("prepare", ["bump", "changelog"]);

	// grunt release can be called directly
};