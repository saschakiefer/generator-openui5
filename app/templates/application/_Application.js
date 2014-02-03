(function() {
	"use strict";

	jQuery.sap.declare("Application");
	jQuery.sap.require("sap.ui.app.Application");
	jQuery.sap.require("model.Config");

	sap.ui.app.Application.extend("Application", {
		init: function() {
			// set global models
			var oImgModel = new sap.ui.model.json.JSONModel("model/img.json");
			sap.ui.getCore().setModel(oImgModel, "img");

			var sCurrentLocale = sap.ui.getCore().getConfiguration().getLanguage();
			var oResourceModel = new sap.ui.model.resource.ResourceModel({
				// bundleUrl: "i18n",
				bundleName: "i18n.messageBundle",
				bundleLocale: sCurrentLocale
			});
			sap.ui.getCore().setModel(oResourceModel, "i18n");

			// start mock server
			if (model.Config.isMock) {
				jQuery.sap.require("sap.ui.app.MockServer");
				var oMockServer = new sap.ui.app.MockServer({
					rootUri: model.Config.getServiceUrl()
				});
				//The mock server needs a metadata XML file describing the data structure of your 
				//service. You can easily obtain this by opening the oData service root URL in a 
				//browser with the suffix "$metadata" appended. Copy the resulting XML file into 
				//the model folder of your application. 
				oMockServer.simulate("model/metadata.xml", "model/");
				oMockServer.start();
			}
		},

		main: function() {
			// create app view and put to html root element
			var root = this.getRoot();
			sap.ui.jsview("main", "view.Main").placeAt(root);
		}
	});
}());