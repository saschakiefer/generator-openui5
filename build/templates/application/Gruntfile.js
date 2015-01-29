/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({

		dir: {
			webapp: "webapp",
			dist: "dist",
			bower_components: "bower_components"
		},

		jshint: {
			jshintrc: true,
			application: {
				src: [
					"<%%= dir.webapp %>/**",
					"util/**/*.js",
					"view/**/*.js",
					"*.js"
				]
			}
		},

		watch: {
			application: {
				files: "<%%= jshint.application.src %>",
				tasks: ["jshint"]
			},
			livereload: {
				options: {
					livereload: "<%%= connect.options.livereload %>"
				},
				files: [
					"<%%= dir.webapp %>/**",
					"util/**/*.js",
					"view/**/*.js",
					"*.js",
					"view/**/*.xml"
				]
			}
		},


		open: {
			root: {
				path: "http://<%%= connect.options.hostname %>:<%%= connect.options.port %>",
				options: {
					delay: 500
				}
			}
		},


		connect: {
			options: {
				port: "<%= localServerPort %>",
				livereload: 35729,
				hostname: "localhost",
				base: "."
			},

			/*
			//=====================================================================
			//RESOURCE PROXY - un-comment the proxies setting below to configure
			//a proxy. context, host and changeOrigin are necessary. port defaults
			//to 80 anyway and rewrite allows you to re-write the url's sent to
			//the target host if you require this.
			//Also un-comment the connect middleware option under the
			//connect:livereload target - this starts the proxy which looks up
			//the proxies setting to determine which services to act on.
			//When not using grunt-connect-proxy you still must have the
			//livereload target for connect.
			//
			proxies: {
				context: "/Northwind",  // When the url contains this...
				host: "services.odata.org", // Proxy to this host
				changeOrigin: true
				//port: 80 //,
				//rewrite: {
				//	"^/odata": ""
				//"^/changingcontext": "/anothercontext"
				//}
			},
			//=====================================================================
			*/

			// Requires the Livereload browser extension or a middleware to inject the livereload script
			// Must have at least one connect task!
			livereload: {
				/*
				options: {
					middleware: function(connect, options) {
						if (!Array.isArray(options.base)) {
							options.base = [options.base];
						}

						// Setup the proxy
						var middlewares = [require("grunt-connect-proxy/lib/utils").proxyRequest];

						// Serve static files.
						options.base.forEach(function(base) {
							middlewares.push(connect.static(base));
						});

						return middlewares;
					}
				}
				*/
			}
		}
	});

	// These plugins provide necessary tasks
	grunt.loadNpmTasks("grunt-contrib-qunit");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-open");
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-connect-proxy");

	grunt.registerTask("default", ["jshint", "qunit:all", "watch"]);
	grunt.registerTask("serve", function() {
		grunt.task.run([
			"configureProxies",
			"connect:livereload",
			"open",
			"watch"
		]);
	});
};
