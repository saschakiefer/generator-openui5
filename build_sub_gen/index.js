/*global module, require */
(function() {
	"use strict";
	var util = require("util");
	//var chalk = require("chalk");
	var ScriptBase = require("../script-base.js");

	/*jshint unused: vars */
	var BuildToolGenerator = module.exports = function BuildToolGenerator(args, options, config) {
		ScriptBase.apply(this, arguments);

	};

	util.inherits(BuildToolGenerator, ScriptBase);

	BuildToolGenerator.prototype.askForViewName = function askForViewName() {
		// If a name was passed as parameter, we don't need to ask for a name
		//if (this.componentName) {
		//	return;
		//}

		//var cb = this.async();

		//var prompts = [{
		//	type: "input",
		//	name: "componentName",
		//	message: "What is the name of the component you want to generate (e.g. foo.bar.myComponent)?",
		//}];

		//this.prompt(prompts, function(props) {
		//	this.componentName = props.componentName;

		//	cb();
		//}.bind(this));
	};



	BuildToolGenerator.prototype.copyFiles = function() {
		//if (!this.componentName) {
		//	console.error(chalk.red("Sorry, but without a component name, I could not generate a component."));
		//	return;
		//}


		this.copy("application/Gruntfile.js", "Gruntfile.js");

		//this.template("application/_Component.js", "Component.js");
		//this.template("application/_component.json", "component.json");

		// Check if a link to the local resource exists and if not, add it.
		// But only, if the application namespace is not part of the object already
		//if (!this.addApplicationNamespaceToObject) {
		//	this.addResource(this.componentName);
		//}
	};
}());
