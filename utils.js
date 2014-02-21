/*global process, module, require */
(function() {
	var path = require("path");
	var fs = require("fs");

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
		var fullPath = path.join(args.path, args.file);

		args.haystack = fs.readFileSync(fullPath, "utf8");
		var body = rewrite(args);

		fs.writeFileSync(fullPath, body);
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

		var lines = args.haystack.split("\n");

		var otherwiseLineIndex = 0;
		lines.forEach(function(line, i) {
			if (line.indexOf(args.needle) !== -1) {
				otherwiseLineIndex = i;
			}
		});

		// Count the spaces before the needle and add the splicable
		// padded to the same number of spaces so that we finish with
		// nice formatting.
		// Handle spaces or tabs as whitespace!
		var spaces = 0;
		while (lines[otherwiseLineIndex].charAt(spaces) === " ") {
			spaces += 1;
		}

		var spaceStr = "";

		if (spaces > 0) {
			while ((spaces -= 1) >= 0) {
				spaceStr += " ";
			}
		} else {
			var tabs = 0;
			while (lines[otherwiseLineIndex].charAt(tabs) === "\t") {
				tabs += 1;
			}

			while ((tabs -= 1) >= 0) {
				spaceStr += "\t";
			}
		}



		lines.splice(otherwiseLineIndex, 0, args.splicable.map(function(line) {
			return spaceStr + line;
		}).join("\n"));

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



	module.exports = {
		rewrite: rewrite,
		rewriteFile: rewriteFile,
		getNamespace: getNamespace
	};
}());