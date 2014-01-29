/*global describe, beforeEach, it, __dirname, require*/
(function() {
	"use strict";

	var path = require("path");
	var helpers = require("yeoman-generator").test;

	describe("openui5 uiComponent generator", function() {
		beforeEach(function(done) {
			console.log("*** Faceless Component ***");

			helpers.testDirectory(path.join(__dirname, "temp"), function(err) {
				if (err) {
					return done(err);
				}

				this.component = helpers.createGenerator("openui5:uiComponent", [
					"../../uiComponent"
				]);

				done();
			}.bind(this));
		});

		it("creates expected files with args", function(done) {
			var expected = [
				"foo/bar/Test/Component.js",
				"foo/bar/Test/component.json",
				"foo/bar/Test/js/.gitkeep"
			];

			helpers.mockPrompt(this.component, {
				componentName: "foo.bar.Test"
			});

			this.component.run({}, function() {
				helpers.assertFile(expected);
				done();
			});
		});
	});

}());