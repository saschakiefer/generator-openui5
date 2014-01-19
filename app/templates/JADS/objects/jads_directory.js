var gc = require('../config.js');       // Global Variables.
var err = require(gc.error_object);     // JADS error object.
var fs    = require('fs');              // Node file system object.

// Formats an entry for the directory listing based on whether its a file or dir.
var listingForItem = function (requestURL, filename, fileType) {
    // The template of an entry as well as the indicator variable for a file or dir.
    var listingEntry = '<tr><td>{itemType}</td><td><a href="{hrefLink}">{itemName}</a></td></tr>\n';
    
    // Populate the template now using the placeholders as text to be replaced.
    listingEntry = listingEntry.replace('{itemType}', fileType);
    listingEntry = listingEntry.replace('{hrefLink}', gc.coreFunctions.joinPaths(requestURL, filename));
    listingEntry = listingEntry.replace('{itemName}', filename);
    
    // Return the entry.
    return listingEntry;
};

// Reads, formats and returns the directory contents of the path supplied.
exports.returnDirectoryContentsForPath = function (fileSystemPath, httpResponse, requestURL) {
    var i;  // Loop variable used during directory contents looping.

    // Read the file system
    fs.readdir(fileSystemPath, function (error, files) {
        
        // Setup the variables for the files, dirs and the response body which will contain the HTML page template.
        var fileString = '', dirString = '', responseBody;
        
        // Read the HTML page template for the directory listing.
        responseBody = fs.readFileSync('./objects/jads_dir_list.template', {encoding : 'utf-8'});
        
        // Nothing we can do if there is an error.
		if (error) {
			err.newError(500, 'Unable to complete request - server dir unreadable ', undefined, httpResponse, 'jad_directory.js', 'returnDirectoryContentsForPath');
		} else {

            // For each file we retrieve stats about it and then format an output.
			for (i = files.length - 1; i >= 0; i = i - 1) {

                // Retrieve the file statistics.
                fileStats = fs.statSync(fileSystemPath + files[i]);
                
                // Based on whether it is a file or not we format accordingly.
                if (!fileStats.isFile()) {
                    dirString = dirString + listingForItem(requestURL, files[i], 'Dir');
                } else {
                    fileString = fileString + listingForItem(requestURL, files[i], 'File');
                }
			}
            
            // Set the content type to HTML.
			httpResponse.setHeader("Content-Type", 'text/html');
            
            // Inset the dirs and files into the template.
            responseBody = responseBody.replace('{dirs}', dirString);
            responseBody = responseBody.replace('{files}', fileString);
            
            // Put the title on the page and fill in the page header (hence the greedy flag).
            responseBody = responseBody.replace(new RegExp('{dirName}', 'g'), requestURL);

			// Write the response code
            httpResponse.writeHead(200);
            httpResponse.end(responseBody);
		}

	});
};