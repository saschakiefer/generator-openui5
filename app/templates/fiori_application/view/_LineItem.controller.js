(function() {
	"use strict";

	sap.ui.controller("<%= fioriComponentNamespace %>.view.LineItem", {

		onInit: function() {
			this.bus = sap.ui.getCore().getEventBus();
		},

		handleNavBack: function() {
			this.bus.publish("nav", "back");
		}

	});

}());