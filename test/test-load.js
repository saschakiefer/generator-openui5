/*global describe, it*/
(function() {
	"use strict";

	var assert = require('assert');

	describe('sapui5 generator', function() {
		it('can be imported without blowing up', function() {
			var app = require('../app');
			assert(app !== undefined);
		});
	});
}());