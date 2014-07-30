/*global module, require */
(function() {
	"use strict";
	var util = require("util");
	var chalk = require("chalk");
	var ScriptBase = require("../script-base.js");

	/*jshint unused: vars */
	var BuildToolGenerator = module.exports = function BuildToolGenerator(args, options, config) {
		ScriptBase.apply(this, arguments);

		this.on("end", function() {
			this.installDependencies({
				callback: function() {
					this.log("\n\ngrunt - will start jsHint on all js files and xml views.");
					this.log("grunt serve - will start a local web server with live-reload and CORS proxy (if configured) and open the default html file.");
					this.log(chalk.blue("\n\nYeoman OpenUI5 Generator bought to you by: Jason Scott & Sascha Kiefer.\n"));
				}.bind(this)
			});
		});
	};

	util.inherits(BuildToolGenerator, ScriptBase);

	BuildToolGenerator.prototype.askPrompts = function() {
		var cb = this.async();

		var prompts = [{
			type: "input",
			name: "serverPort",
			message: "Local web server port?",
			default: "8080"
		}, {
			type: "confirm",
			name: "liveReload",
			message: "Enable live-reloading of browser on file changes?",
			default: true
		}, {
			type: "confirm",
			name: "proxy",
			message: "Enable resource proxy (bypass CORS)?",
			default: false
		}, {
			when: function(response) {
				return response.proxy === true;
			},
			name: "proxyContext",
			message: "Proxy context (when the url contains this...)?",
			default: "/Northwind"
		}, {
			when: function(response) {
				return response.proxy === true;
			},
			name: "proxyHost",
			message: "Proxy host (proxy to this host...)?",
			default: "services.odata.org"
		}, {
			type: "confirm",
			name: "ui5Ignore",
			message: "Add Ui5RepositoryIgnore file?",
			default: false
		}, {
			type: "confirm",
			name: "gitIgnore",
			message: "Add a .gitignore file?",
			default: false
		}, {
			type:"confirm",
			name: "jshintrc",
			message: "Add a default .jshintrc file (this overrides any settings in the Gruntfile.js)?",
			default: false
		}, {
			type: "confirm",
			name: "jsbeautifyrc",
			message: "Add a default .jsbeautify file?",
			defaut: false
		}];

		this.prompt(prompts, function(props) {
			this.serverPort = props.serverPort;
			this.liveReload = props.liveReload;
			this.proxy = props.proxy;
			this.ui5Ignore = props.ui5Ignore;
			this.gitIgnore = props.gitIgnore;
			this.jshintrc = props.jshintrc;
			this.jsbeautifyrc = props.jsbeautifyrc;

			cb();
		}.bind(this));
	};



	BuildToolGenerator.prototype.copyFiles = function() {
		this.template("application/Gruntfile.js", "Gruntfile.js");
		this.template("application/_package.json", "package.json");

		if (this.ui5Ignore) {
			this.copy("application/Ui5RepositoryIgnore", ".Ui5RepositoryIgnore");
		}
		if (this.gitIgnore) {
			this.copy("application/gitignore", ".gitignore");
		}
		if (this.jshintrc) {
			this.copy("application/jshintrc", ".jshintrc");
		}
		if (this.jsbeautifyrc) {
			this.copy("application/jsbeautifyrc", ".jsbeautifyrc");
		}
	};
}());
