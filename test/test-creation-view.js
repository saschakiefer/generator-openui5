/*global describe, beforeEach, it, __dirname, require*/
(function() {
	"use strict";

	var path = require("path");
	var helpers = require("yeoman-generator").test;

	describe("openui5 view generator", function() {
		beforeEach(function(done) {
			console.log("*** View ***");

			helpers.testDirectory(path.join(__dirname, "temp"), function(err) {
				if (err) {
					return done(err);
				}

				this.view = helpers.createGenerator("openui5:view", [
					"../../view"
				]);

				done();
			}.bind(this));
		});

		it("creates expected files with args - js view", function(done) {
			var expected = [
				"view/Test.controller.js",
				"view/Test.view.js"
			];

			helpers.mockPrompt(this.view, {
				viewName: "Test",
				viewType: "jsView"
			});

			this.view.run({}, function() {
				helpers.assertFile(expected);
				done();
			});
		});

		it("creates expected files with args - xml view", function(done) {
			var expected = [
				"view/Test.controller.js",
				"view/Test.view.xml"
			];

			helpers.mockPrompt(this.view, {
				viewName: "Test",
				viewType: "xmlView"
			});

			this.view.run({}, function() {
				helpers.assertFile(expected);
				done();
			});
		});
	});

}());