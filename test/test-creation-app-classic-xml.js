/*global describe, beforeEach, it, __dirname, require*/
(function() {
	"use strict";

	var path = require("path");
	var helpers = require("yeoman-generator").test;

	describe("openui5 app generator", function() {
		beforeEach(function(done) {
			console.log("*** Classic App w/ XML View ***");

			helpers.testDirectory(path.join(__dirname, "temp"), function(err) {
				if (err) {
					return done(err);
				}

				this.app = helpers.createGenerator("openui5:app", [
					"../../app"
				]);

				done();
			}.bind(this));
		});

		it("creates expected files with args", function(done) {
			var mockPrompts = {
				applicationName: "My Application",
				appDescription: "Test Description",
				authorName: "John Doe",
				gitRepository: "ssh://github.com/ropository/url.git",
				licenseType: "Apache License, Version 2.0",
				applicationType: "classical",
				viewType: "xmlView",
				openUI5LocationOption: "bower"
			};

			var expected = [
				"css/style.css",
				"ext/.gitkeep",
				"test/.gitkeep",
				"i18n/messageBundle.properties",
				"img/.gitkeep",
				"model/Config.js",
				"model/img.json",
				"util/.gitkeep",
				"index.html",
				"Gruntfile.js",
				".jshintrc",
				"bower.json",
				"package.json",
				"README.md",
				"view/Main.controller.js",
				"view/Main.view.xml",
				"Application.js"
			];

			helpers.mockPrompt(this.app, mockPrompts);

			// Test the view generation in this case via parameter
			this.app.args = ["Main", false];
			this.app.options["skip-install"] = true;
			this.app.run({}, function() {
				helpers.assertFile(expected);
				done();
			});
		});
	});

}());