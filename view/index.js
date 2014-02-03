(function() {
	/* global require, module */
	"use strict";
	var util = require("util");
	var ScriptBase = require("../script-base.js");

	/*jshint unused: vars */
	var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
		ScriptBase.apply(this, arguments);

		// Assume the first argument being the file name and the second the view type
		// TODO: Refactor this, since the dependency on the right sequenc is unfortunate
		if (args.length > 0) {
			this.viewName = "view." + args[0];

			//true = xml view; false = js view
			if (args[1] === "true") {
				this.viewType = "xmlView";
			} else {
				this.viewType = "jsView";
			}
		}
	};

	util.inherits(ViewGenerator, ScriptBase);



	/**
	 * Generator prompts for view name and type
	 * By convention we use a folder called view to store the views and controllers.
	 */
	ViewGenerator.prototype.askForViewNameAndType = function askForViewNameAndType() {
		// If a name was passed as parameter -- or -- the app generator is building a fiori-style app, we don't need to ask for a name.
		if (this.viewName || this.fiori) {
			return;
		}

		var cb = this.async();

		var prompts = [{
			type: "input",
			name: "viewName",
			message: "What is the name of the view you want to generate (will be created in 'view' folder by convention; default is Main)?",
			default: "Main"
		}, {
			type: "list",
			name: "viewType",
			message: "What view type would you like?",
			choices: [{
				name: "JS View",
				value: "jsView",
			}, {
				name: "XML View",
				value: "xmlView",
			}]
		}];

		this.prompt(prompts, function(props) {
			this.viewName = "view." + props.viewName;
			this.viewType = props.viewType;

			cb();
		}.bind(this));
	};



	/**
	 * Scaffolding of the view
	 */
	ViewGenerator.prototype.createView = function createView() {
		if (this.fiori) {
			return;
		}

		// Create a potential folder structure
		if (this.viewName.lastIndexOf(".") > -1) {
			var path = this.viewName.substring(0, this.viewName.lastIndexOf("."));
			path = path.replace(/\./g, "/");
			this.mkdir(path);
		}

		var absoluteNamePref = this.viewName.replace(/\./g, "/");

		// Setup the view and associated controller
		this.template("application/view/_Main.controller.js", absoluteNamePref + ".controller.js");

		if (this.viewType === "xmlView") {
			this.template("application/view/_Main.view.xml", absoluteNamePref + ".view.xml");
		} else {
			this.template("application/view/_Main.view.js", absoluteNamePref + ".view.js");
		}
	};
}());