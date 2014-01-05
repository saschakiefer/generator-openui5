/*global process, module, require */
"use strict";
var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");
var openUI5Utils = require("./util.js");
var chalk = require("chalk");

var Generator = module.exports = function Generator() {
	yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.appTemplate = function(src, dest) {
	yeoman.generators.Base.prototype.template.apply(this, [
		src + this.scriptSuffix,
		path.join(this.env.options.appPath, dest.toLowerCase()) + this.scriptSuffix
	]);
};



/**
 * Check if a sap.ui.localResources() entry exists for the first element of the
 * elemetPath in index.html. If not, it's added to index.html.
 *
 * @param {String} elementPath Path of the element to be checked
 */
Generator.prototype.appTemplate = function addLocalResource(elementPath) {
	var indexPath = path.join(process.cwd(), "index.html");
	var localResourcesString = "sap.ui.localResources(\"" + elementPath.split(".")[0] + "\");";

	try {
		openUI5Utils.rewriteFile({
			file: "index.html ",
			needle: "/* endOfResources */",
			splicable: [localResourcesString]
		});
	} catch (e) {
		console.log(chalk.red("\nUnable to find " + indexPath + ".") + chalk.yellow(localResourcesString) + "not added.\n");
	}
};