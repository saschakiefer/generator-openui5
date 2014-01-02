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
			this.xmlView = args[1];  //true = xml view; false = js view
		}
	};

	util.inherits(ViewGenerator, yeoman.generators.Base);

	// By convention we use a folder called view to store the views and controllers.
	ViewGenerator.prototype.askForViewName = function askForViewName() {
		// If a name was passed as parameter, we don't need to ask for a name. If the view type was not also provided then use JS
		if (this.viewName) {
			return;
		}

		var cb = this.async();

		var prompts = [{
			type: 'input',
			name: 'viewName',
			message: 'What is the name of the view you want to generate (will be created in "view" folder by convention; default is Main)?',
			default: 'Main'
		}, {
			type: 'checkbox',
			name: 'features',
			message: 'What more would you like?',
			choices: [{
				name: 'XML View',
				value: 'xmlView',
				checked: true
			}]
		}];

		this.prompt(prompts, function(props) {
			this.viewName = 'view.' + props.viewName;

			// check for other features...
			var features = props.features;

			function hasFeature(feat) { return features.indexOf(feat) !== -1; }

			this.xmlView = hasFeature('xmlView');

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

		// Setup the view and associated controller
		this.template('application/view/_Main.controller.js', absoluteNamePref + '.controller.js');
		if (this.xmlView) {
			this.template('application/view/_Main.view.xml', absoluteNamePref + '.view.xml');
		} else {
			this.template('application/view/_Main.view.js', absoluteNamePref + '.view.js');
		}

		// If the generator is called from the main task, the Application.js needs to be copied as well.
		// This can be done only here, since the dynamic view name needs to be templated into the view
		if (!this.skipApplicationJS) {
			this.template('../../app/templates/application/_Application.js', 'Application.js');
		}
	};
}());