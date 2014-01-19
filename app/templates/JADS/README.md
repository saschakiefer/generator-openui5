JADS: Just Another Developer Server - Node.js based web server

Release Date - 15th Jan 2014
Author - Brenton O'Callaghan (@callaghan001)

Contents
=============
- Introduction
- Version Notes
- How to use JADS
- Coming Soon

Introduction
=============
JADS is a node.js based web server specifically designed to be:
	- Light Weight
	- Designed for SAPUI5 and SAP NetWeaver Gateway development friendly
	- Easy to debug / extend
	- Open Source

Version Notes (Version 1)
=========================
- Initial version of JADS
- Basic HTML/CSS/Image support for local files
- Proxy support to Odata services tested with a SAP HANA system
- Configurable to suit the installed environment

How to use JADS
======================
Jads requires the node.js environment installed on your machine (see http://nodejs.org/ for more information).

- To run JADS
	- Pull this GIT repository to a directory
	- Edit the config.js file to ensure all variables match your system configuration
	- Run JADS using the command 'node jads.js'
	- See Console output for more information

Coming Soon
======================
- Proxy post support
- Proxy passthrough auth support