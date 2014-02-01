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
	 * Generator prompts for configuration - basic prompts for all apps
	 */
	openui5Generator.prototype.askForBasics = function() {
		this.promptForBasicDetails();
	};



	/**
	 * Generator prompts for configuration
	 */
	openui5Generator.prototype.askForApplication = function askFor() {
		var cb = this.async();

		var prompts = [{
			name: "applicationType",
			type: "list",
			message: "What type of application do you want?",
			choices: [{
				name: "Classical",
				value: "classical"
			}, {
				name: "Fiori Splitter App",
				value: "fiori"
			}, {
				name: "Fiori Tiles App",
				value: "tiles"
			}, {
				name: "Single Page MVC App",
				value: "spa"
			}]
		}, { // Only ask these questions if fiori-type app is chosen
			when: function(response) {
				return (response.applicationType === "fiori" || response.applicationType === "tiles");
			},
			name: "fioriComponentNamespace",
			message: "What component namespace do you want?",
			default: "sap.ui.demo"
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

			// We need to pass the fiori option through to the called View generator. so that it
			// knows whether to execute or not. At the time that the prompts have been answered
			// the hook to run the view generator has already been set!
			// Currently comunication with the sub-generato can only be done via files as the
			// options passed to the view generator are already set before the app generator
			// questions are answered...
			// If we are scaffolding a fiori app we don't need the view generator so it will just exit.
			// (View generator not required for SPA app either.)
			var LocalStorage = require("node-localstorage").LocalStorage;
			if (this.applicationType === "fiori" || this.applicationType === "spa" || this.applicationType === "tiles") {
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



	openui5Generator.prototype.askForBuildOptions = function() {
		var cb = this.async();

		var prompts = [{
			name: "localServerPort",
			message: "Local server port?",
			default: "8080"
		}];

		this.prompt(prompts, function(props) {
			this.localServerPort = props.localServerPort;

			cb();
		}.bind(this));
	};



	/**
	 * Scaffolding of the common project files, which are needed for every project type
	 *
	 * @return {[type]} [description]
	 */
	openui5Generator.prototype.projectFiles = function projectfiles() {
		this.copy("jshintrc", ".jshintrc");
		//this.copy("Gruntfile.js", "Gruntfile.js");
		this.template("Gruntfile.js", "Gruntfile.js");
		this.template("_bower.json", "bower.json");
		this.template("_package.json", "package.json");
		this.template("gitignore", ".gitignore");
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
	 * Scaffolding for a Fiori SplitterApp application.
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

	/**
	 * Scaffolding for a Fiori single page MVC application.
	 */
	openui5Generator.prototype.singlePageApplication = function() {
		if (this.applicationType !== "spa") {
			return;
		}

		this.template("spa/_index.html", "index.html");
	};

	/**
	 * Scaffolding for a Fiori TileContainer MVC application.
	 */
	openui5Generator.prototype.tilesApplication = function() {
		if (this.applicationType !== "tiles") {
			return;
		}

		this.mkdir("css");
		this.copy("gitkeep", "css/.gitkeep");

		this.mkdir("test");
		this.copy("gitkeep", "test/.gitkeep");

		this.mkdir("i18n");
		this.copy("fiori_tiles_app/i18n/messageBundle.properties", "i18n/messageBundle.properties");

		this.mkdir("img");
		this.copy("gitkeep", "img/.gitkeep");

		this.mkdir("model");
		this.copy("fiori_tiles_app/model/Config.js", "model/Config.js");
		this.copy("fiori_tiles_app/model/img.json", "model/img.json");
		this.copy("fiori_tiles_app/model/ODataModelFakeService.js", "model/ODataModelFakeService.js");

		this.mkdir("util");
		this.template("fiori_tiles_app/util/_Formatter.js", "util/Formatter.js");
		this.template("fiori_tiles_app/util/_Grouper.js", "util/Grouper.js");

		this.mkdir("view");
		this.template("fiori_tiles_app/view/_Root.view.xml", "view/Root.view.xml");
		this.template("fiori_tiles_app/view/_Root.controller.js", "view/Root.controller.js");
		this.template("fiori_tiles_app/view/_Home.view.js", "view/Home.view.js");
		this.template("fiori_tiles_app/view/_Home.controller.js", "view/Home.controller.js");
		this.template("fiori_tiles_app/view/_Detail.view.xml", "view/Detail.view.xml");
		this.template("fiori_tiles_app/view/_Detail.controller.js", "view/Detail.controller.js");

		this.template("fiori_tiles_app/_index.html", "index.html");
		this.template("fiori_tiles_app/_Component.js", "Component.js");
	};
}());