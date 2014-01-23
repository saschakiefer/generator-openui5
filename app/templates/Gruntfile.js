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
				}
			},

			gruntfile: {
				src: "Gruntfile.js"
			},
			libTest: {
				src: ["lib/**/*.js", "test/**/*.js"]
			},
			application: {
				src: ["model/**/*.js", "util/**/*.js", "view/**/*.js", "Application.js"]
			}
		},


		qunit: {
			all: {
				src: ["test/**/*.html"]
			}
		},


		watch: {
			gruntfile: {
				files: "<%%= jshint.gruntfile.src %>",
				tasks: ["jshint:gruntfile"]
			},
			libTest: {
				files: "<%%= jshint.libTest.src %>",
				tasks: ["jshint:lib_test", "qunit"]
			},
			application: {
				files: "<%%= jshint.application.src %>",
				tasks: ["jshint:application"]
			}
		},



		open: {
			root: {
				path: "http://localhost:8080",
				options: {
					delay: 500
				}
			}
		},

		jads: {
			options: {
				port: "8080",
				document_root: ".",
				alias: {<%
					if (openUI5LocationOption === "bower") {%>
					"openui5": "bower_components/openui5-bower"<%
					}%> <%
					if (openUI5LocationOption === "custom" && openUI5Location.indexOf("http") === -1) {%>
					"openui5": "<%= originalOpenUI5Location %>"<%
					}%>
				}
			}
		}
	});



	// These plugins provide necessary tasks.
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-open");
	grunt.loadNpmTasks("grunt-JADS");



	grunt.registerTask("default", ["jshint", "qunit:all", "watch"]);
	grunt.registerTask("server", ["open:root", "jads:keepalive"]);
};