
var gc = require('../config.js');   // Global Variables.
var fs = require('fs');             // The standard file system library.
var path = require('path');         // Standard Node path library

exports.startupChecks = function () {
	this.log('==============================================================', gc.debug_level_off);
	this.log(' Welcome to JADS (Just another development (web) server)      ', gc.debug_level_off);
	this.log(' Build Date: 14/01/13 - build number: 1                       ', gc.debug_level_off);
	this.log(' Author: Brenton O\'Callaghan (@callaghan001)			        ', gc.debug_level_off);
	this.log('==============================================================', gc.debug_level_off);

	if (gc.debug_mode_enabled > gc.debug_level_off) {
        this.log('Debug mode is enabled at level ' + gc.debug_mode_enabled + ' - to disable please see config.js', gc.debug_level_info);
    }

	// First we check to make sure that the document root is a valid folder.
	if (!this.pathExists(gc.documents_location)) {
		this.log('The supplied webserver document location does not exist - exiting.', gc.debug_level_off);
		process.exit();
	}

	this.log('Startup checks complete', gc.debug_level_info);
};

// ==============================================================================================
//
// Logging Functions
//
// ==============================================================================================

// A standard function which determines whether to output a log to console.
exports.log = function (message, logLevel) {

	// If the global log level is equal to or greater than the
	// supplied log level we output - otherwise we don't.
	if (gc.debug_mode_enabled >= logLevel) {
		console.log(message);
	}

	// TODO - output all logs to a file regardless of log level
};
// ==============================================================================================
//
// PATH FUNCTIONS
//
// ==============================================================================================
exports.formatPath = function (ipath) {
	return path.normalize(ipath);
};

// Determine the correct extension from a path
exports.getReqestExtension = function (requestURL) {
	return path.extname(requestURL).toLowerCase();
};


exports.resolveFileLocation = function (requestURL) {
	var newURL = path.join(gc.documents_location, requestURL);
	return this.formatPath(newURL);
};

exports.getRequestFolders = function (requestURL) {
	this.log('Splitting request path to:' + requestURL.split('/'), gc.debug_level_full);
	return requestURL.split('/');
};

exports.joinPaths = function (p1, p2) {
	return path.join(p1, p2);
};

exports.isAliasURL = function (requestURL) {

    var aliasLocation = gc.server_alias_locations[this.aliasName(requestURL)];
    
	if (aliasLocation) {
		return aliasLocation;
	}
};

exports.isProxyURL = function (requestURL) {

	var splitPath = this.getRequestFolders(requestURL);
	if (splitPath[1].toLowerCase() === 'proxy') {
		return true;
    }
	return false;
};

exports.aliasName = function (requestURL) {

	var splitPath = this.getRequestFolders(requestURL);
	return splitPath[1].toLowerCase();
};

// Checks if the current request is for the JADS about page.
exports.isAboutServerRequest = function (aliasName) {
	return (aliasName.toLowerCase() === 'about');
};

// ==============================================================================================
// FILE FUNCTIONS
// ==============================================================================================

// Function for checking if a path is valid.
exports.pathExists = function (path) {
	
	this.log('Checking that the following path exists: ' + path, gc.debug_level_full);

	if (path === null || path === undefined) {
		this.log('Path is null or undefined', gc.debug_level_full);
		return false;
	}

	return fs.existsSync(path);
};

// Checks the global configuration to see if the extension is supported.
exports.isSupportedFileType = function (extension) {

	if (gc.supportedMimeTypes[extension] !== undefined) {
		return true;
    }

	this.log('Unsupported file type ' + extension, gc.debug_level_info);
	return false;
};

// Checks the passed in extension and indicates if the file is streamable (i.e. an image).
exports.isStreamableFileType = function (extension) {

	if (gc.streamingFileTypes[extension] !== undefined) {
		return true;
    }
	return false;
};