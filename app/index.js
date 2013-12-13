/*global __dirname*/
(function() {
	'use strict';
	var util = require('util');
	var path = require('path');
	var yeoman = require('yeoman-generator');

	/*jshint unused: vars */
	var Sapui5Generator = module.exports = function Sapui5Generator(args, options, config) {
		yeoman.generators.Base.apply(this, arguments);
		console.log(this.yeoman);

		this.hookFor('sapui5:view', {
			options: {
				args: args,
				options: {
					skipApplicationJs: false // Tell the view to also copy the Application.js (since the ViewName needs to be added there)
				}
			}
		});

		this.on('end', function() {
			this.installDependencies({
				skipInstall: options['skip-install']
			});
		});

		this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
	};

	util.inherits(Sapui5Generator, yeoman.generators.Base);

	Sapui5Generator.prototype.askFor = function askFor() {
		var cb = this.async();

		var prompts = [{
			name: 'applicationName',
			message: 'What do you want to name this application?',
			default: 'My Application'
		}, {
			name: 'appDescription',
			message: 'Please describe it with a few words:'
		}, {
			name: 'authorName',
			message: 'What is your name?',
			default: 'John Doe'
		}, {
			name: 'gitRepository',
			message: 'What is your git repository?',
			default: 'ssh://github.com/ropository/url.git'
		}, {
			name: 'licenseType',
			message: 'What is your license Type?',
			default: 'MIT'
		}, ];

		this.prompt(prompts, function(props) {
			this.applicationName = props.applicationName;
			this.appDescription = props.appDescription;
			this.authorName = props.authorName;
			this.gitRepository = props.gitRepository;
			this.licenseType = props.licenseType;

			cb();
		}.bind(this));
	};

	Sapui5Generator.prototype.app = function app() {
		this.mkdir('css');
		this.copy('application/css/style.css', 'css/style.css');

		this.mkdir('ext');
		this.copy('gitkeep', 'ext/.gitkeep');

		this.mkdir('test');
		this.copy('gitkeep', 'test/.gitkeep');

		this.mkdir('i18n');
		this.copy('application/i18n/i18n_en.properties', 'i18n/i18n_en.properties');

		this.mkdir('img');
		this.copy('gitkeep', 'img/.gitkeep');

		this.mkdir('model');
		this.copy('application/model/Config.js', 'model/Config.js');
		this.copy('application/model/img.json', 'model/img.json');

		this.mkdir('util');
		this.copy('gitkeep', 'util/.gitkeep');

		this.template('application/_index.html', 'index.html');
	};

	Sapui5Generator.prototype.projectfiles = function projectfiles() {
		this.copy('Gruntfile.js', 'Gruntfile.js');
		this.copy('jshintrc', '.jshintrc');
		this.template('_bower.json', 'bower.json');
		this.template('_package.json', 'package.json');
		this.template('_README.md', 'README.md');
	};
}());