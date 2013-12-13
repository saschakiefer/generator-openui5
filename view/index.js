(function() {
	'use strict';
	var util = require('util');
	var yeoman = require('yeoman-generator');

	var ViewGenerator = module.exports = function ViewGenerator(args, options /*, config*/ ) {
		// We use Base instead of name Base to have the option of calling w/o arguments
		yeoman.generators.Base.apply(this, arguments);

		if (typeof options.skipApplicationJs === 'undefined') {
			this.skipApplicationJS = true;
		} else {
			this.skipApplicationJS = false;
		}

		// Assume the first argument being the file name
		if (args.length > 0) {
			this.viewName = args[0];
		}
	};

	util.inherits(ViewGenerator, yeoman.generators.Base);

	// By convention we use a folder called view to store the views and controllers.
	ViewGenerator.prototype.askForViewName = function askForViewName() {
		// If a name was passed as parameter, we don't need to ask for a name
		if (this.viewName) {
			return;
		}

		var cb = this.async();

		var prompts = [{
			type: 'input',
			name: 'viewName',
			message: 'What is the name of the view you want to generate? (Will be created in "view" folder by convention; default is Main. Reserved words: ext, view, i18n, css, img, model, node*, test, util)?',
			default: 'view.Main'
		}];

		this.prompt(prompts, function(props) {
			this.viewName = (props.viewName === 'view.Main')? props.viewName : 'view.' + props.viewName;

			cb();
		}.bind(this));
	};

	ViewGenerator.prototype.createView = function createView() {
		// Create a potential folder structure
		if (this.viewName.lastIndexOf('.') > -1) {
			var path = this.viewName.substring(0, this.viewName.lastIndexOf('.'));
			path = path.replace(/\./g, '/');
			this.mkdir(path);
		}

		var absoluteNamePref = this.viewName.replace(/\./g, '/');

		//
		this.template('application/view/_Main.controller.js', absoluteNamePref + '.controller.js');
		this.template('application/view/_Main.view.js', absoluteNamePref + '.view.js');

		// If the generator is kalled from the main task, the Application.js needs to be copied as well.
		// This can be done only here, since the dynamic view name needs to be templated into the view
		if (!this.skipApplicationJS) {
			this.template('../../app/templates/application/_Application.js', 'Application.js');
		}
	};
}());