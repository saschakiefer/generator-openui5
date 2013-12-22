(function() {
	'use strict';
	var util = require('util');
	var yeoman = require('yeoman-generator');
	var openui5Utils = require('../utils.js');
	var chalk = require('chalk');

	/*jshint unused: vars */
	var ComponentGenerator = module.exports = function ComponentGenerator(args, options, config) {
		// We use Base instead of name Base to have the option of calling w/o arguments
		yeoman.generators.Base.apply(this, arguments);

		// Assume the first argument being the file name
		if (args.length > 0) {
			this.componentName = args[0];
		}
	};

	util.inherits(ComponentGenerator, yeoman.generators.Base);

	ComponentGenerator.prototype.askForViewName = function askForViewName() {
		// If a name was passed as parameter, we don't need to ask for a name
		if (this.componentName) {
			return;
		}

		var cb = this.async();

		var prompts = [{
			type: 'input',
			name: 'componentName',
			message: 'What is the name of the component you want to generate (e.g. foo.bar.myComponent)?',
		}];

		this.prompt(prompts, function(props) {
			this.componentName = props.componentName;

			cb();
		}.bind(this));
	};

	ComponentGenerator.prototype.createComponent = function createComponent() {
		if (!this.componentName) {
			console.error(chalk.red('Sorry, but without a component name, I could not generate a component.'));
			return;
		}

		var path = this.componentName.replace(/\./g, '/');

		if (path[path.length] !== '/') {
			path = path + '/';
		}

		this.mkdir(path + '/js');
		this.copy('../../app/templates/gitkeep', path + 'js/.gitkeep');

		this.template('application/_Component.js', path + 'Component.js');
		this.template('application/_component.json', path + 'component.json');

		// Check if a link to the local resource exists and if not, add it.
		openui5Utils.addLocalResource(this.componentName);
	};
}());