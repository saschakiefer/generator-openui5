/*global describe, it, require*/
(function() {
	"use strict";

	var assert = require("assert");

	describe("openui5 generator", function() {
		it("can be imported without blowing up", function() {
			var app = require("../app");
			assert(app !== undefined);
		});
	});
}());
