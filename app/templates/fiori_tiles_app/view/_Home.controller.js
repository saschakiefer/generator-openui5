(function() {
	"use strict";

	sap.ui.controller("<%= fioriComponentNamespace %>.view.Home", {

		handleTileTap: function(evt) {
			this.navigation.navTo("idViewRoot--idViewDetail", evt.getSource().getBindingContext());
		},

		productCount: function(oValue) {
			//return the number of products linked to Category
			if (oValue) {
				var sPath = this.getBindingContext().getPath() + "/Products";
				return this.getModel().bindList(sPath).getContexts().length;
			}
		}
		
	});

}());