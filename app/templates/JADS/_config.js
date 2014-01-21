// ===================================
// User-changeable configuration
// ===================================

// Change this variable to switch the log level 
// 0 = no logging, 1 = info level logging, 2 = full logging
exports.debug_mode_enabled = 0;

// Location of the SAPUI5 libraries (if required)
exports.server_alias_locations = { <%
	if (openUI5LocationOption === "bower") { %>
			'sapui5': 'bower_components/openui5-bower',
		<%
	} %>
		'about': 'JADS/docs/about.html'
};

// Location of the web server document root (without trailing slash)
// E.g. for Windows use a path like: 'C:\\Users\\bocallaghan\\Webserver\\Documents'
// E.g. for MAC/Unix use a path like: '/some/path/to/your/html/files'
exports.documents_location = process.cwd();

// The assumed file extension if one is not provided
// Normal web servers would have index.html, index.htm or Default.html
exports.document_default_file = 'index.html';

// The port the server should listen on.
exports.server_port = 8080;

// SAP Odata Proxy configuration
// This will change slightly in the future to pass the auth requests to the original client
// For now the username and password is hardcoded.
// This will change later.
exports.proxy_sap_host = 'myHanaServer'; // The server you want to proxy your Odata calls to.
exports.proxy_sap_post = 8005; // The port on that server that should be hit
exports.proxy_sap_username = 'POC_USER'; // The username to log onto the odata server
exports.proxy_sap_password = 'Password2'; // The passsword to log onto the odata server

// Location of the JADS documentation (DO NOT CHANGE)
exports.docs_location = 'JADS/docs/about.html';

// ===================================
// Internal Server config (Experts only)
// ===================================

// Log levels
exports.debug_level_info = 1;
exports.debug_level_full = 2;
exports.debug_level_off = 0;

// locations on disk of the various jads objects.
exports.request_object = './objects/jads_request.js';
exports.about_object = './aboutHandler.js';
exports.error_object = './jads_error.js';

// The MIME types supported by JADS (All others are ignored)
exports.supportedMimeTypes = {
	'.html': 'text/html',
	'.properties': 'text/plain',
	'.js': 'application/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.xml': 'application/xml',
	'.md': 'text/plain',
	'.library': 'text/plain',
	'.theming': 'text/plain',
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.jpg': 'image/jpg',
	'.jpeg': 'image/jpeg',
	'.ttf': 'application/octet-stream'
};

// Large file types - this needs to be improved in the future.
exports.streamingFileTypes = {
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.jpg': 'image/jpg',
	'.jpeg': 'image/jpeg',
	'.ttf': 'application/octet-stream'
};

// Access to core functions such as logging.
exports.coreFunctions = require('./objects/globalFunctions.js'); // Core Functions such as logging.