(function() {
	"use strict";

	jQuery.sap.require("sap.m.MessageBox");
	jQuery.sap.require("sap.m.MessageToast");

	sap.ui.controller("<%= fioriComponentNamespace %>.view.Detail", {

		handleNavButtonPress: function() {
			this.navigation.navBack();
		}
		
	});

}());