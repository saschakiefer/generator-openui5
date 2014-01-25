(function() {
	/* global __dirname, require, module */
	"use strict";
	var util = require("util");
	var path = require("path");
	var ScriptBase = require("../script-base.js");

	/*jshint unused: vars */
	var openui5Generator = module.exports = function openui5Generator(args, options, config) {
		ScriptBase.apply(this, arguments);
		console.log(this.yeoman);

		this.hookFor("openui5:view", {
			options: {
				args: args,
				options: {
					skipApplicationJs: false, // Tell the view to also copy the Application.js (since the ViewName needs to be added there)
					fiori: this.fiori
				}
			}
		});

		this.on("end", function() {
			this.installDependencies({
				skipInstall: options["skip-install"]
			});
		});

		this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, "../package.json")));
	};

	util.inherits(openui5Generator, ScriptBase);



	/**
	 * Generator prompts for configuration
	 */
	openui5Generator.prototype.askFor = function askFor() {
		var cb = this.async();

		var prompts = [{
			name: "applicationName",
			message: "What do you want to name this application?",
			default: "My Application"
		}, {
			name: "appDescription",
			message: "Please describe it with a few words:"
		}, {
			name: "authorName",
			message: "What is your name?",
			default: "John Doe"
		}, {
			name: "gitRepository",
			message: "What is your git repository?",
			default: "ssh://github.com/ropository/url.git"
		}, {
			name: "licenseType",
			message: "What is your license Type?",
			default: "Apache License, Version 2.0"
		}, {
			type: "list",
			name: "applicationType",
			message: "What type of application do you want?",
			choices: [{
				name: "Classical",
				value: "classical"
			}, {
				name: "Fiori",
				value: "fiori"
			}, {
				name: "Single Page MVC App",
				value: "spa"
			}]
		}, { // Fiori specific question
			when: function(response) {
				return (response.applicationType === "fiori");
			},
			name: "fioriComponentNamespace",
			message: "What component namespace do you want?",
			default: "sap.ui.demo"
		}, {
			// This question is to allow the user to choose from various basic types of fiori app
			when: function(response) {
				return (response.applicationType === "fiori");
			},
			type: "list",
			name: "fioriAppType",
			message: "What type of Fiori app would you like?",
			choices: [{
				name: "Master / Detail",
				value: "masterdetail"
			}, {
				name: "Single Page (tbd)",
				value: "singlepage"
			}]
		}];

		this.prompt(prompts, function(props) {
			this.applicationName = props.applicationName;
			this.appDescription = props.appDescription;
			this.authorName = props.authorName;
			this.gitRepository = props.gitRepository;
			this.licenseType = props.licenseType;
			this.applicationType = props.applicationType;

			this.fioriComponentNamespace = props.fioriComponentNamespace;
			this.fioriAppType = props.fioriAppType;

			// We need to pass the fiori option through to the called View generator. At this stage
			// it can only be done via files as the options passed to the view generator are already
			// set before the app generator questions are answered...
			// If we are scaffolding a fiori app we don't need the view generator so it will just exit.
			// (View generator not required for SPA app either.)
			var LocalStorage = require("node-localstorage").LocalStorage;
			if (this.applicationType === "fiori" || this.applicationType === "spa") {
				new LocalStorage("./scratch").setItem("fiori", "true");
			} else {
				new LocalStorage("./scratch").setItem("fiori", "false");
			}

			this.namespace = props.componentNamespace;

			cb();
		}.bind(this));

	};



	openui5Generator.prototype.askForUI5Location = function() {
		this.promptForUI5Location();
	};



	/**
	 * Scaffolding of the common project files, which are needed for every project type
	 *
	 * @return {[type]} [description]
	 */
	openui5Generator.prototype.projectFiles = function projectfiles() {
		this.copy("jshintrc", ".jshintrc");
		this.copy("Gruntfile.js", "Gruntfile.js");
		this.template("_bower.json", "bower.json");
		this.template("_package.json", "package.json");
		this.template("_README.md", "README.md");
	};



	/**
	 * Scaffolding for the classical application dependent project files.
	 * This is only executed when application type "classical" is selected
	 */
	openui5Generator.prototype.classicalApplication = function app() {
		if (this.applicationType !== "classical") {
			return;
		}

		this.mkdir("css");
		this.copy("application/css/style.css", "css/style.css");

		this.mkdir("ext");
		this.copy("gitkeep", "ext/.gitkeep");

		this.mkdir("test");
		this.copy("gitkeep", "test/.gitkeep");

		this.mkdir("i18n");
		this.copy("application/i18n/messageBundle.properties", "i18n/messageBundle.properties");

		this.mkdir("img");
		this.copy("gitkeep", "img/.gitkeep");

		this.mkdir("model");
		this.copy("application/model/Config.js", "model/Config.js");
		this.copy("application/model/img.json", "model/img.json");

		this.mkdir("util");
		this.copy("gitkeep", "util/.gitkeep");

		this.template("application/_index.html", "index.html");
	};



	/**
	 * Scaffolding for the fiori application dependent project files.
	 * This is only executed when application type "fiori" is selected
	 */
	openui5Generator.prototype.fioriApplication = function() {
		if (this.applicationType !== "fiori") {
			return;
		}

		this.mkdir("css");
		this.copy("gitkeep", "css/.gitkeep");

		this.mkdir("test");
		this.copy("gitkeep", "test/.gitkeep");

		this.mkdir("i18n");
		this.copy("fiori_application/i18n/messageBundle.properties", "i18n/messageBundle.properties");

		this.mkdir("img");
		this.copy("gitkeep", "img/.gitkeep");

		this.mkdir("model");
		this.copy("fiori_application/model/Config.js", "model/Config.js");
		this.copy("fiori_application/model/img.json", "model/img.json");
		this.copy("fiori_application/model/mock.json", "model/mock.json");

		this.mkdir("util");
		this.template("fiori_application/util/_Formatter.js", "util/Formatter.js");
		this.template("fiori_application/util/_Grouper.js", "util/Grouper.js");

		this.mkdir("view");
		this.template("fiori_application/view/_Root.view.xml", "view/Root.view.xml");
		this.template("fiori_application/view/_Root.controller.js", "view/Root.controller.js");
		this.template("fiori_application/view/_Master.view.xml", "view/Master.view.xml");
		this.template("fiori_application/view/_Master.controller.js", "view/Master.controller.js");
		this.template("fiori_application/view/_Empty.view.xml", "view/Empty.view.xml");
		this.template("fiori_application/view/_Detail.view.xml", "view/Detail.view.xml");
		this.template("fiori_application/view/_Detail.controller.js", "view/Detail.controller.js");
		this.template("fiori_application/view/_LineItem.view.xml", "view/LineItem.view.xml");
		this.template("fiori_application/view/_LineItem.controller.js", "view/LineItem.controller.js");

		this.template("fiori_application/_index.html", "index.html");
		this.template("fiori_application/_Component.js", "Component.js");
	};

	openui5Generator.prototype.singlePageApplication = function() {
		if (this.applicationType !== "spa") {
			return;
		}

		this.template("spa/_index.html", "index.html");
	};
}());