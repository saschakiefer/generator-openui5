var gc = require('./config.js');                    // Global Variables.
var err = require('./objects/' + gc.error_object);  // JADS Object definition.

// First perform the standard startup checks (is the config correct etc.)
gc.coreFunctions.startupChecks();

var http = require('http'); // The standard HTTP node library.

var jadsRequest = require(gc.request_object);	// JADS object representing a request object.

// Handler for uncaught exceptions - the most common of which will be attempting to start on a port already in use :)
process.on('uncaughtException', function(err) {
    if(err.errno === 'EADDRINUSE')
         gc.coreFunctions.log('Unable to start server on port ' + gc.server_port + '. Check if this port is already in use or change your JADS server config.', gc.debug_level_off);
    else
          gc.coreFunctions.log(err, gc.debug_level_off);
    process.exit(1);
});


// Standard handler for any request to the server.
var server = http.createServer(function (req, res) {
	
	gc.coreFunctions.log('Request received', gc.debug_level_full);

	try {
		// Setup the request object up.
		jadsRequest.setRequest(req);

		// Prepare & send the response back to the requester.
		jadsRequest.sendResponse(res);
	} catch (error) {
		err.newError(500, 'Processing of this request terminated abnormally: ' + error, req, res, 'jads.js', 'main');
	}
	
});

gc.coreFunctions.log('Starting server listening on port ' + gc.server_port, gc.debug_level_info);

// Startup the server and listen on the specified port (usually 8080).
server.listen(gc.server_port);