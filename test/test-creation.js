/*global describe, beforeEach, it, __dirname*/
(function() {
	"use strict";

	var path = require('path');
	var helpers = require('yeoman-generator').test;


	describe('sapui5 app generator', function() {
		beforeEach(function(done) {
			helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
				if (err) {
					return done(err);
				}

				this.app = helpers.createGenerator('sapui5:app', [
					'../../app',
					'../../view'
				]);

				this.mockPrompts = {
					applicationName: 'My Application',
					appDescription: 'Test Description',
					authorName: 'John Doe',
					gitRepository: 'ssh://github.com/ropository/url.git',
					licenseType: 'MIT'
				};

				this.expected = [
					'css/style.css',
					'ext/.gitkeep',
					'test/.gitkeep',
					'i18n/i18n_en.properties',
					'img/.gitkeep',
					'model/Config.js',
					'model/img.json',
					'util/.gitkeep',
					'index.html',
					'Gruntfile.js',
					'.jshintrc',
					'bower.json',
					'package.json',
					'README.md',
					'view/Main.controller.js',
					'view/Main.view.js',
					'Application.js'
				];

				done();
			}.bind(this));
		});



		it('creates expected files with args', function(done) {
			helpers.mockPrompt(this.app, this.mockPrompts);

			var expected = this.expected;

			this.app.args = ['view.Main'];
			this.app.options['skip-install'] = true;
			this.app.run({}, function() {
				helpers.assertFiles(expected);
				done();
			});
		});
	});
}());