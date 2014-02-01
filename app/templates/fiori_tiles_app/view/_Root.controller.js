(function() {
	"use strict";

	sap.ui.controller("<%= fioriComponentNamespace %>.view.Root", {
		onInit: function() {
			this.app = this.getView().byId("idApp");

			// Have child views use this controller for navigation
			var that = this;
			this.app.getPages().forEach(function(page) {
				page.getController().navigation = that;
			});
		},

		navTo: function(pageId, context) {
			this.app.to(pageId);
			if (context) {
				this.app.getPage(pageId).setBindingContext(context);
			}

		},

		navBack: function() {
			this.app.back();
		}

	});

}());