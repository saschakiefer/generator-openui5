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
			application: {
				src: ["model/**/*.js", "util/**/*.js", "view/**/*.js", "*.js" <%
					if (applicationType === "tiles") { %> , "!model/ODataModelFakeService.js" <%
					} %>
				]
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
			qunit: {
				files: ["<%%= jshint.application.src %>", "<%%= qunit.all.src %>"],
				tasks: ["qunit"]
			},
			application: {
				files: "<%%= jshint.application.src %>",
				tasks: ["jshint:application"]
			} <%
			if (liveReload) { %> ,
				livereload: {
					options: {
						livereload: "<%%= connect.options.livereload %>"
					},
					//files: "<%%= jshint.application.src %>" // Be careful to not watch npm dependencies
					files: ["model/**/*.js", "util/**/*.js", "view/**/*.js", "*.js", "view/**/*.xml" <%
						if (applicationType === "tiles") { %> , "!model/ODataModelFakeService.js" <%
						} %>
					]
				} <%
			} %>
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
				port: <%= localServerPort %> ,
				<%
				if (liveReload) { %>
						livereload: 35729,
					<%
				} %>
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