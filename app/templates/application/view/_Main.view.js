(function() {
	"use strict";

	sap.ui.jsview("view.Main", {

		/** Specifies the Controller belonging to this View. 
		 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
		 * @memberOf fioricollaboration.ShellView
		 */
		getControllerName: function() {
			return "view.Main";
		},

		//#######################################################################################################################################################
		// VIEW LAYOUT FUNCTIONS
		//#######################################################################################################################################################

		/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
		 * Since the Controller is given to this method, its event handlers can be attached right away.
		 * @memberOf fioricollaboration.ShellView
		 */
		/*jshint unused: vars */
		createContent: function(oController) {
			var oControl = new sap.ui.commons.Button({
				text: "{i18n>WELCOME_MESSAGE}",
				press: oController.doSomething
			});

			return oControl;
		}
	});
}());