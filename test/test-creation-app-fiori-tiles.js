/*global describe, beforeEach, it, __dirname, require*/
(function() {
	"use strict";

	var path = require("path");
	var helpers = require("yeoman-generator").test;
	var assert = require("assert");

	describe("openui5 app generator - fiori tiles", function() {
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
				helpers.assertFile(expected);
				done();
			});
		});

		it("templates index.html properly", function(done) {
			console.log("*** CHECK TILES APP INDEX.HTML SCAFFOLDING ***");

			var mockPrompts = {
				applicationName: "My Tiles Application",
				appDescription: "Test Description",
				authorName: "John Doe",
				gitRepository: "ssh://github.com/ropository/url.git",
				licenseType: "Apache License, Version 2.0",
				applicationType: "tiles",
				fioriComponentNamespace: "sap.ui.demo",
				openUI5LocationOption: "bower"
			};

			helpers.mockPrompt(this.app, mockPrompts);
			this.app.args = ["Main", false];
			this.app.options["skip-install"] = true;
			
			this.app.run({}, function() {
				var cheerio = require("cheerio"),
					indexFile = this.app.readFileAsString("index.html"),
					$ = cheerio.load(indexFile);

				assert($("title").text() === "My Tiles Application", "index.html title is incorrect");
				assert($("#sap-ui-bootstrap").attr("src") === "bower_components/openui5-bower/resources/sap-ui-core.js",
							"index.html bootstrap tag is incorrect. Should be " + "bower_components/openui5-bower/resources/sap-ui-core.js");
				assert($("script"));

				done();
			}.bind(this));
		});

	});

}());