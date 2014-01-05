/*global process, module, require */
(function() {
	var util = require("util");
	var path = require("path");
	var yeoman = require("yeoman-generator");
	var openUI5Utils = require("./utils.js");
	var chalk = require("chalk");

	var Generator = module.exports = function Generator() {
		yeoman.generators.Base.apply(this, arguments);
	};

	util.inherits(Generator, yeoman.generators.Base);


	/**
	 * Check if a sap.ui.localResources() entry exists for the first element of the
	 * elemetPath in index.html. If not, it's added to index.html.
	 *
	 * @param {String} elementPath Path of the element to be checked
	 */
	Generator.prototype.addLocalResource = function(elementPath) {
		var indexPath = path.join(process.cwd(), "index.html");
		var localResourcesString = "sap.ui.localResources( \"" + elementPath.split(".")[0] + "\" );";

		try {
			console.log(chalk.green("    check ") + "localResources register in index.html.");
			openUI5Utils.rewriteFile({
				file: "index.html",
				needle: "/* endOfResources */",
				splicable: [localResourcesString]
			});
		} catch (e) {
			console.log(chalk.red("\nUnable to find " + indexPath + ". ") + chalk.yellow(localResourcesString) + " could not be registered. Please check the resource register manaually.\n");
		}
	};
}());