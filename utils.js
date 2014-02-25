/*global process, module, require */
(function() {
	var path = require("path");
	var fs = require("fs");
	var chalk = require("chalk");

	// This concept is borrowed from the generator-angular project.

	/**
	 * Method searching a certain string in a file and adding it just before the give hook string.
	 *
	 * @param  {Object} args.splicable: Content to be added if not present
	 *                  args.haysteck:  Content string to be searched within
	 *                  args.needle:    Hook string, before which the content is added
	 */
	function rewriteFile(args) {
		args.path = args.path || process.cwd();
		args.fullPath = path.join(args.path, args.file);
		args.haystack = fs.readFileSync(args.fullPath, "utf8");
		var body = rewrite(args);

		fs.writeFileSync(args.fullPath, body);
	}



	/**
	 * Escaping function
	 *
	 * @param  {String} str Input
	 *
	 * @return {String}     Output
	 */
	function escapeRegExp(str) {
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}



	/**
	 * Method searching a certain string in a file and adding it just before the give hook string.
	 *
	 * @param  {Object} args.splicable: Content to be added if not present
	 *                  args.haysteck:  Content string to be searched within
	 *                  args.needle:    Hook string, before which the content is added
	 *                  args.extraIndents: Number of extra indents when formatting
	 *                                      the spicable value
	 *
	 * @return {String} Modified content
	 */
	function rewrite(args) {
		// check if splicable is already in the body text
		var re = new RegExp(args.splicable.map(function(line) {
			return "\\s*" + escapeRegExp(line);
		}).join("\n"));

		if (re.test(args.haystack)) {
			return args.haystack;
		}

		// scan the haystack looking for a needle
		var lines = args.haystack.split("\n");
		var otherwiseLineIndex = 0,
			foundNeedle = false;

		lines.forEach(function(line, i) {
			if (line.indexOf(args.needle) !== -1) {
				otherwiseLineIndex = i;
				foundNeedle = true;
			}
		});

		if (!foundNeedle) {
			throw {
				name: "not_found",
				file: args.fullPath,
				needle: args.needle
			};
		}

		// Count the spaces before the needle and add the splicable
		// padded to the same number of spaces so that we finish with
		// nice formatting.
		// Handle spaces or tabs as whitespace!
		var spaces = 0;
		while (lines[otherwiseLineIndex].charAt(spaces) === " ") {
			spaces += 1;
		}

		var spaceStr = "";
		args.extraIndents = args.extraIndents || 0;

		if (spaces > 0) {
			spaces += args.extraIndents;

			while ((spaces -= 1) >= 0) {
				spaceStr += " ";
			}
		} else {
			var tabs = 0;
			while (lines[otherwiseLineIndex].charAt(tabs) === "\t") {
				tabs += 1;
			}

			tabs += args.extraIndents;
			while ((tabs -= 1) >= 0) {
				spaceStr += "\t";
			}
		}


		var windowsCarriageReturn = false;
		if (lines[otherwiseLineIndex].slice(-1) === "\r") {
			windowsCarriageReturn = true;
			lines[otherwiseLineIndex] = lines[otherwiseLineIndex].replace(/\r/, "");
		}


		lines.splice(otherwiseLineIndex, 0, args.splicable.map(function(line) {
			return spaceStr + line;
		}).join("\n"));


		if (windowsCarriageReturn) {
			lines[otherwiseLineIndex] += "\r";
		}

		return lines.join("\n");
	}


	/**
	 * Read the namespace from the index.html. Returns blank if none is found.
	 *
	 * @return {string} Namespace
	 */
	function getNamespace() {
		var namespace;

		try {
			var indexPath = path.join(process.cwd(), "index.html");
			var indexContent = fs.readFileSync(indexPath, "utf8").replace(/[\n\r\t]/g, " "); // File as long string w/o CR and TAB

			namespace = indexContent.match(/(data\-sap\-ui\-resourceroots\s*\=\s*')(?:(?=(\\?))\2.)*?'/)[0].
			match(/"(.*?)"/)[0].
			split("\"")[1];
		} catch (e) {
			namespace = "";
		}

		return namespace;
	}



	/**
	 * Method to add a line terminating comma on a specified line within a file.
	 *
	 * @param  {Object} args.path:   Path to filename (use CWD if not provided)
	 *                  args.file:   Filename
	 *                  args.needle: Hook string - insertion point marker
	 *                  args.offset: Number of line above or below the needle to
	 *                               add the comma. i.e. -2 is 2 lines before.
	 */
	function addCommaToLine(args) {
		var fullPath = "",
			haystack = "",
			lines,
			line,
			lineIndex = 0,
			foundNeedle = false,
			windowsCarriageReturn = false;

		args.path = args.path || process.cwd();
		fullPath = path.join(args.path, args.file);
		haystack = fs.readFileSync(fullPath, "utf8");

		// scan the haystack looking for the needle
		lines = haystack.split("\n");
		lines.forEach(function(line, i) {
			if (line.indexOf(args.needle) !== -1) {
				lineIndex = i;
				foundNeedle = true;
			}
		});

		if (!foundNeedle) {
			throw {
				name: "not_found",
				file: fullPath,
				needle: args.needle
			};
		}

		lineIndex += args.offset;
		if (lineIndex < 0) {
			throw {
				name: "line_index_negative",
				file: fullPath,
				needle: args.needle,
				offset: args.offset
			};
		}

		line = lines[lineIndex];

		if (lines[lineIndex].slice(-1) === "\r") {
			windowsCarriageReturn = true;
			line = lines[lineIndex].replace(/\r/, "");
		}

		if (line.slice(-1) === ",") {
			console.log("last char is already a comma!");
			return;
		} else {
			line += windowsCarriageReturn? ",\r" : ",";
		}

		lines[lineIndex] = line;

		fs.writeFileSync(fullPath, lines.join("\n"));
	}



	function logResourceRootEditingError(e) {
		if (e.name === "not_found") {
			console.log(chalk.red("Unable to find identifier: ") + chalk.yellow(e.needle) + chalk.red(" in " + e.file + ". Please edit manually."));
		} else if (e.name === "line_index_negative") {
			console.log(chalk.red("Unable to format the resource roots in index.html. An invalid offset has been used: " + e.offset + ". Please format the resource roots json manually."));
		} else {
			console.log(chalk.red("\nUnable to anter resource root:"));
			console.log(chalk.red(e.message));
		}
	}



	module.exports = {
		rewrite: rewrite,
		rewriteFile: rewriteFile,
		addCommaToLine: addCommaToLine,
		getNamespace: getNamespace,
		logResourceRootEditingError: logResourceRootEditingError
	};
}());