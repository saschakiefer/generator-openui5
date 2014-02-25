(function() {
	"use strict";

	sap.ui.controller("<%= fioriComponentNamespace %>.view.Home", {

		onInit: function() {
			this.bus = sap.ui.getCore().getEventBus();
		},

		handleTileTap: function(evt) {
			this.bus.publish("nav", "to", {
				id: "idViewRoot--idViewDetail",
				data: {
					context: evt.getSource().getBindingContext()
				}
			});
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