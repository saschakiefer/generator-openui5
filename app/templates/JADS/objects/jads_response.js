
var gc = require('../config.js');               // Global Variables.
var fs = require('fs');                         // The standard file system library.
var util = require('util');                     // The standard file system library.
var err = require(gc.error_object);             // JADS Error Object.
var stream = require('stream');                 // Standard Node Stream Object.
var dir = require('./jads_directory');          // JADS Directory Object.

var request = null;
var response = null;
var validURL = false;
var filePath = null;
var responseData = null;
var responseCode = null;
var dataPayload = false;
var responseContentType = null;

exports.prepareResponseForRequest = function (req, httpResponse) {

	// Clear all variables.
	//delete request, response, validURL, filePath, responseData, responseCode, dataPayload, responseContentType;
	
	/*
	 * The logic for this method can be quite complex. The structure is as follows:	
	 *
	 * If we have an alias request (e.g. /SAPUI5/something/else)
	 *		Construct the file system path to account for the alias
	 * Else
	 *     Construct the file system path based on the configured document directory for the web files.
	 *
	 * If there is no file extension on the request and no trailing /
	 *     Redirect them to the same URL with the /
	 * Else if there is no file extension
	 *     Add the default file extension (.html)
	 *
	 * If the file exists they are requesting
	 *     If it is a supported file/MIME type
	 *			If it is a streamable file type (e.g. image)
	 *				Mark as streamable and prepare to respond
	 *			else
	 *				Prepare to respond as normal
	 *		else
	 *			respond with a 500 error
	 * else
	 *		if the path exists
	 *			Do a directory listing
	 *		else
	 *			respond with a 404
	 * 
	 */
	
	// Store the request locally.
	this.request = req;

	var aliasLocation, aliasName, fileSystemPath;

	// We first need to make sure we are not dealing with an alias (e.g. sapui5)
	gc.coreFunctions.log('Path Location ' + req.path, gc.debug_level_full);

	// Obtain the alias location if it exists.
	aliasLocation = gc.coreFunctions.isAliasURL(req.path);
	
	// If we have an alias we need to adjust the OS path to account for it.
	if (aliasLocation !== undefined) {
		gc.coreFunctions.log('Alias based URL requested', gc.debug_level_full);

		// Retrieve the alias base so we know what we need to replace.
		aliasName = gc.coreFunctions.aliasName(req.path);

		// SERVER SPECIFIC - look for a request for /about/ as this is a internal page
		if (gc.coreFunctions.isAboutServerRequest(aliasName)) {
			this.filePath = aliasLocation;
		} else {
            
			// Clear up the original path to show without the alias base &
            // Join the alias location with the rest of the inputted URL.
			this.filePath = gc.coreFunctions.joinPaths(aliasLocation, req.path.replace('/' + aliasName, ''));

			// Format the path to work with the OS.
			this.filePath = gc.coreFunctions.formatPath(this.filePath);
		}
		
	} else {
		// Otherise just resolve the file location correcty.
		this.filePath = gc.coreFunctions.resolveFileLocation(req.path);
		gc.coreFunctions.log('Requested file resolved to ' + this.filePath, gc.debug_level_full);
	}

	fileSystemPath = this.filePath;

	// Here we need to check to make sure that even though they might be looking to list the directory, they need a trailing /
	if (fs.statSync(this.filePath).isDirectory() && req.path.substr(req.path.length - 1) !== '/') {

		gc.coreFunctions.log('Directory listing required - but missing trailing /', gc.debug_level_full);

		// Set the 'moved' header resonse
		httpResponse.setHeader("Content-Type", "text/html");
		httpResponse.setHeader("Location", req.path + '/');

		// Write the response code
		httpResponse.writeHead(301);

	    // Write the error message
	    httpResponse.end('');
	    return undefined;

	// Now we need to append a filename if one hasn't been provided (e.g if they pass /f1/f2 rather than /f1/f2/index.html)
	} else if (fs.statSync(this.filePath).isDirectory()) {
		this.filePath = gc.coreFunctions.joinPaths(this.filePath, gc.document_default_file);
	}

	// We cannot continue if the path does not exist.
	if (gc.coreFunctions.pathExists(this.filePath)) {

		// Now we only continue if the file is of a supported type.
		if (gc.coreFunctions.isSupportedFileType(gc.coreFunctions.getReqestExtension(this.filePath))) {
			
			// If the file type is a payload type (like an image or movie)
			if (gc.coreFunctions.isStreamableFileType(gc.coreFunctions.getReqestExtension(this.filePath))) {
				gc.coreFunctions.log('File ' + this.filePath + ' is streamable', gc.debug_level_full);

				// Mark the file as being a payload
				this.dataPayload = true;

				// Store the content type / MIME type.
				this.responseContentType = gc.supportedMimeTypes[gc.coreFunctions.getReqestExtension(this.filePath)];
			} else {
				// Otherwise we have a normal, understandable file as per the config.
				gc.coreFunctions.log('File ' + this.filePath + ' is a standard request', gc.debug_level_full);

				// 200 = OK as a response code.
				this.responseCode = 200; // OK

				// It is not a data payload (i.e. streamable)
				this.dataPayload = false;

				// Set the content type (MIME type).
				this.responseContentType = gc.supportedMimeTypes[gc.coreFunctions.getReqestExtension(this.filePath)];
			}
		} else {

			// If the file type is unsupported, that is fine but if it is a file without an extension
			// which is sometimes the case for the SAPUI5 docs we should return it as text :(
			if (gc.coreFunctions.getReqestExtension(this.filePath) === '') {

				gc.coreFunctions.log('File ' + this.filePath + ' is a standard request but for a file without an extension', gc.debug_level_full);

				// 200 = OK as a response code.
				this.responseCode = 200; // OK

				// It is not a data payload (i.e. streamable)
				this.dataPayload = false;

				// Set the content type (MIME type).
				this.responseContentType = 'plain/text';
			} else {

				err.newError(500,
					'Unsupported file type ' + gc.coreFunctions.getReqestExtension(this.filePath),
					this.request,
					httpResponse,
					'jad_response.js', 'prepareResponseForRequest');
				return undefined;
			}
		}
		
	} else {
		// If we get here the file request did not exists, however if we appended the default file name (index.html)
		// We should do a directory listing instead so we do that if the path exists.
		if (fs.statSync(fileSystemPath).isDirectory()) {
			dir.returnDirectoryContentsForPath(fileSystemPath, httpResponse, req.path);
			return undefined;
		} else {
			err.newError(404,
					'File ' + this.filePath + ' not found',
					this.request,
					httpResponse,
					'jad_response.js', 'prepareResponseForRequest');
			return undefined;
		}
	}
	return this;
};

// Respond to the request provided.
exports.sendResponse = function (httpRes) {

	// If it is not a payload response (not an image or movie etc.)
	if (!this.dataPayload) {
		// Set the content type
		httpRes.setHeader("Content-Type", this.responseContentType);

		// Write the response code
        httpRes.writeHead(this.responseCode);
        
        // We now complete this using the async method as it gives better performance.
        var options = {'encoding' : 'utf8'};
        
        // Read the file specified, then when complete complete and send the request.
        fs.readFile(this.filePath, function (err, data) {
			if (err) {
				err.newError(500, 'Unable to complete request - server file unreadable ', this.request, httpRes, 'jad_response.js', 'sendResponse');
			} else {
				httpRes.end(data);
			}
		});
	} else {
		// Otherwise we have a streamable type so trigger the stream.
		gc.coreFunctions.log('Payload Response Required', gc.debug_level_full);
		this.streamResponse(httpRes);
	}
};

// Stream a response back to the client (e.g. an image).
exports.streamResponse = function (httpRes) {

    var mimeType, filePath;
    
	// Store the mime type & file path. so it can be used in the callbacks
	mimeType = this.responseContentType;
	filePath = this.filePath;

	// Get the stats on the file so we can determine the size.
	fs.stat(this.filePath, function (error, stat) {
        
        var rs;
        
        // Write the header of the response.
        httpRes.writeHead(200, {
            'Content-Type' : mimeType,
            'Content-Length' : stat.size
        });
        
        // Create a read stream from the file (more efficient than other methods).
        // Changed away from using util.pump as it is now deprecated.
        rs = fs.createReadStream(filePath).pipe(httpRes);
    });
};