
var gc = require('../config.js');       // Global Variables.
var http = require('http');             // The standard HTTP node library.
var err = require(gc.error_object);     // JADS error object.

// Called to process a proxy request
exports.processProxyRequest = function (jadsRequestObject, httpResponseObject) {

	gc.coreFunctions.log('Proxy request initiated', gc.debug_level_full);

	// Prepare the options for the request.
	var options = {
        hostname: gc.proxy_sap_host,
        port: gc.proxy_sap_post,
        path: jadsRequestObject.path.replace('/proxy', ''),
        method: jadsRequestObject.verb,
        auth: gc.proxy_sap_username + ':' + gc.proxy_sap_password
	};

	var req = http.request(options, function (res) {
		httpResponseObject.setHeader('content-type', res.headers['content-type']);
		httpResponseObject.setHeader('content-length', res.headers['content-length']);
		httpResponseObject.writeHead(res.statusCode);
        
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            httpResponseObject.end(chunk);
        });
    });

	req.on('error', function (e) {
		gc.coreFunctions.log('Proxy request failed: ' + e, gc.debug_level_info);
        err.newError(500,
                     'Proxy request to server failed with response: ' + e.message,
                     jadsRequestObject,
                     httpResponseObject,
                     'jad_proxy.js', 'processProxyRequest');
	});
	req.end();
};