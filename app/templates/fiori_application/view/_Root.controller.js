sap.ui.controller("<%= fioriComponentNamespace %>.view.Root", {

	onInit: function() {

		this.oRoot = this.getView().byId("idRoot");

		// Have child views use this controller for navigation
		var that = this;
		this.oRoot.getMasterPages().forEach(function(oPage) {
			oPage.getController().navigation = that;
		});

		this.oRoot.getDetailPages().forEach(function(oPage) {
			if (oPage.getId() !== "idViewRoot--idViewEmpty") {
				oPage.getController().navigation = that;
			}
		});

	},


	navTo: function(sPageId, oContext) {

		this.oRoot.to(sPageId);
		if (oContext) {
			this.oRoot.getPage(sPageId).setBindingContext(oContext);
		}

	},


	navBack: function() {

		this.oRoot.backDetail();

	}

});