
var gc = require('../config.js');   // Global Variables.

exports.errorCode = 500; // Initialise to 500 for internal error.
exports.errorMessage = 'An internal server error has ocurred. Please check the JADS log.';

exports.sourceFile = undefined; // The source file in which the error occurred.
exports.sourceFuction = undefined; // The function in which the error occurred.

exports.postErrorForResponse = function (res) {

	res.setHeader("Content-Type", "text/html");

	// Write the response code
    res.writeHead(this.errorCode);

    // Write the error message
    res.end(this.errorMessage);
};

exports.newError = function (errorCode, errorMessage, req, res, sourceFile, sourceFunction) {

	gc.coreFunctions.log(errorMessage, gc.debug_level_info);

	this.errorCode = errorCode;
	this.errorMessage = errorMessage;

	this.sourceFile = sourceFile;
	this.sourceFunction = sourceFunction;

	// TODO - log each error out to a log file.

	this.postErrorForResponse(res);
};

