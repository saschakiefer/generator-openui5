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
	 * Prompt to get the UI5 Location string for the bootstrap
	 * Sets global variables:
	 * this.openUI5LocationOption: bower or custom
	 * this.openUI5Location: full path including sap-ui-core.js
	 */
	Generator.prototype.promptForUI5Location = function() {
		console.log("");

		var cb = this.async();

		var openUI5LocationPrompt = [{
			type: "list",
			name: "openUI5LocationOption",
			message: "Where do you want to get OpenUI5 from?",
			choices: [{
				name: "Download it with Bower",
				value: "bower"
			}, {
				name: "Specify location",
				value: "custom"
			}]
		}, {
			when: function(response) {
				return (response.openUI5LocationOption === "custom");
			},
			name: "openUI5Location",
			message: "Where is your 'sap-ui-core.js' located?",
			default: "https://openui5.netweaver.ondemand.com/resources"
		}];

		this.prompt(openUI5LocationPrompt, function(props) {
			this.openUI5LocationOption = props.openUI5LocationOption;

			// Create full path
			if (this.openUI5LocationOption === "bower") {
				this.openUI5Location = "sapui5/resources/";
			} else if (this.openUI5LocationOption === "custom" && props.openUI5Location.indexOf("http") === -1) {
				this.originalOpenUI5Location = props.openUI5Location;
				this.openUI5Location = "sapui5/";
			} else {
				this.openUI5Location = props.openUI5Location;
			}

			if (this.openUI5Location.slice(-1) !== "/") {
				this.openUI5Location += "/";
			}

			this.openUI5Location += "sap-ui-core.js";

			console.log(this.openUI5Location);

			cb();
		}.bind(this));
	};



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