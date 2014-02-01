/*global describe, beforeEach, it, __dirname, require*/
(function() {
	"use strict";

	var path = require("path");
	var helpers = require("yeoman-generator").test;

	describe("openui5 app generator - fiori master/detail", function() {
		beforeEach(function(done) {
			console.log("*** Fiori Splitter App ***");

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
				applicationType: "fiori",
				fioriComponentNamespace: "sap.ui.demo",
				fioriAppType: "masterdetail",
				openUI5LocationOption: "bower"
			};
			var expected = [
				"test/.gitkeep",
				"i18n/messageBundle.properties",
				"img/.gitkeep",
				"model/Config.js",
				"model/img.json",
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
				"view/Master.controller.js",
				"view/Master.view.xml",
				"view/Detail.controller.js",
				"view/Detail.view.xml",
				"view/Empty.view.xml",
				"view/LineItem.controller.js",
				"view/LineItem.view.xml",
				"Component.js"
			];

			helpers.mockPrompt(this.app, mockPrompts);

			this.app.args = ["Main", false];
			this.app.options["skip-install"] = true;
			this.app.run({}, function() {
				helpers.assertFile(expected);
				done();
			});
		});

	});

}());