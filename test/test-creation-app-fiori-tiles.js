/*global describe, beforeEach, it, __dirname, require*/
(function() {
	"use strict";

	var path = require("path");
	var helpers = require("yeoman-generator").test;

	describe("openui5 app generator - fiori master/detail", function() {
		beforeEach(function(done) {
			console.log("*** Fiori Tiles App ***");

			helpers.testDirectory(path.join(__dirname, "temp"), function(err) {
				if (err) {
					return done(err);
				}

				this.app = helpers.createGenerator("openui5:app", [
					"../../app",
					"../../view"
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
				applicationType: "tiles",
				fioriComponentNamespace: "sap.ui.demo",
				openUI5LocationOption: "bower"
			};
			var expected = [
				"test/.gitkeep",
				"i18n/messageBundle.properties",
				"img/.gitkeep",
				"model/Config.js",
				"model/img.json",
				"model/ODataModelFakeService.js",
				"util/Formatter.js",
				"util/Grouper.js",
				"index.html",
				"Gruntfile.js",
				".jshintrc",
				"bower.json",
				"package.json",
				"README.md",
				"view/Root.controller.js",
				"view/Root.view.xml",
				"view/Home.controller.js",
				"view/Home.view.js",
				"view/Detail.controller.js",
				"view/Detail.view.xml",
				"Component.js"
			];

			helpers.mockPrompt(this.app, mockPrompts);

			this.app.args = ["Main", false];
			this.app.options["skip-install"] = true;
			this.app.run({}, function() {
				//helpers.assertFiles(expected);
				helpers.assertFile(expected);
				done();
			});
		});

	});

}());