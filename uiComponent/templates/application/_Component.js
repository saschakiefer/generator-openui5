(function() {
	"use strict";
	// other require statements can go here
	jQuery.sap.require("sap.ui.core.UIComponent");
	jQuery.sap.declare("<%= applicationNamespace%><%= componentName %>.Component"); // change this to your package/component name

	//---------------------------------------------------------------------------------------------------------------------------------------------------
	// Metadata
	//---------------------------------------------------------------------------------------------------------------------------------------------------

	sap.ui.core.UIComponent.extend("<%= applicationNamespace%><%= componentName %>.Component", { //this should be changed to match the declare statement
		metadata: {
			"abstract": true,
			version: "1.0",
			includes: [], //array of css and/or javascript files that should be used in the component
			dependencies: { // external dependencies
				libs: [], // array of required libraries, e.g. UX3 if your component depends on them 
				ui5version: "1.13.0"
			},
			publicMethods: [],
			aggregations: {
				"rootControl": {
					type: "sap.ui.core.Control",
					multiple: false,
					visibility: "hidden"
				} // needs to be set to enable databinding functionality
			},
			autoDestroy: false, // destroy component when view should be destroyed
			initOnBeforeRender: true,
			properties: {
				// put desired properties here, e.g.
				// initialText: { name:"initialText", type:"string", defaultValue:"Lorem impsum dolor sit amet" }
			}
		}
	});

	//---------------------------------------------------------------------------------------------------------------------------------------------------
	// Framework Methods
	//---------------------------------------------------------------------------------------------------------------------------------------------------

	/**
	 * Initialize the component
	 */
	<%= applicationNamespace %><%= componentName %>.Component.prototype.init = function() {
		sap.ui.core.UIComponent.prototype.init.apply(this);
	};

	/**
	 * Create the content by delegating to a view
	 * @returns UI Control
	 */
	<%= applicationNamespace %><%= componentName %>.Component.prototype.createContent = function() {
		// create your component content here, e.g. a view
		// this.view = new sap.ui.view({
		//   id: "myView",
		//   viewName: "path.to.ViewName",
		//   type: sap.ui.core.mvc.ViewType.JS
		// });

		// return this.view;
	};

	//---------------------------------------------------------------------------------------------------------------------------------------------------
	// Public Methods
	//---------------------------------------------------------------------------------------------------------------------------------------------------


	//---------------------------------------------------------------------------------------------------------------------------------------------------
	// Private Methods
	//---------------------------------------------------------------------------------------------------------------------------------------------------
}());