(function() {
	'use strict';
	var util = require('util');
	var yeoman = require('yeoman-generator');

	var ComponentGenerator = module.exports = function ComponentGenerator(args, options /*, config*/ ) {
		// We use Base instead of name Base to have the option of calling w/o arguments
		yeoman.generators.Base.apply(this, arguments);

		// Assume the first argument being the file name
		if (args.length > 0) {
			this.componentName = args[0];
		}
	};

	util.inherits(ComponentGenerator, yeoman.generators.NamedBase);

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

	ComponentGenerator.prototype.createView = function createView() {
		var path = this.componentName.replace(/\./g, '/');

		console.log(path[path.length]);

		if (path[path.length] !== '/') {
			path = path + '/';
		}

		this.mkdir(path + '/js');
		this.copy('../../app/templates/gitkeep', path + 'js/.gitkeep');

		this.template('application/_Component.js', path + 'Component.js');
		this.template('application/_component.json', path + 'component.json');
	};
}());