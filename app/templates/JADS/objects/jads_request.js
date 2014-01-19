
var gc = require('../config.js');               // Global Variables.
var response = require('./jads_response.js');   // JADS Response Object
var proxy = require('./jads_proxy.js');         // JADS Proxy Object

// Request variables
var browserRequest = null;

exports.userAgent = null;
exports.host = null;
exports.url = null;
exports.path = null;
exports.verb = null;
exports.fileType = null;

exports.isProxyRequest = false;

// Setup for this request object.
// Takes a request standard object and extracts relevant information.
exports.setRequest = function (req) {

	// Store the request object locally.
	this.browserRequest = req;

	// If debug is enabled then we output more data.
	gc.coreFunctions.log('Setting up request handler object', gc.debug_level_full);
	gc.coreFunctions.log('===================== REQUEST INFO ======================', gc.debug_level_full);
	gc.coreFunctions.log(this.browserRequest, gc.debug_level_full);
	gc.coreFunctions.log('===================== =========== ======================', gc.debug_level_full);

	// Prepare the relevant info and store into local variables.
	this.userAgent = this.browserRequest.headers["user-agent"];
	this.host = this.browserRequest.headers.host;
	this.url = require('url').parse(this.browserRequest.url, true);
	this.path = this.url.pathname;
	this.verb = this.browserRequest.method; // Get/Put/Post/Update
	this.fileType = gc.coreFunctions.getReqestExtension(this.path);
	this.requestedMimeType = gc.supportedMimeTypes[this.fileType];

	if (gc.coreFunctions.isProxyURL(this.path)) {
		this.isProxyRequest = true;
	} else {
		this.isProxyRequest = false;
	}
};

// Pass on the command to the response object.
exports.sendResponse = function (httpResponse) {

	if (this.isProxyRequest) {
		proxy.processProxyRequest(this, httpResponse);
        
    // setup the response object (we will get a returned object if it is successful)
	} else if (this.response = response.prepareResponseForRequest(this, httpResponse)) {
		// send the response to the request
		this.response.sendResponse(httpResponse);
	}
};