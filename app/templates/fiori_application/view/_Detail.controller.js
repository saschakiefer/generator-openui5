(function() {
	"use strict";

	jQuery.sap.require("<%= fioriComponentNamespace %>.util.Formatter");
	jQuery.sap.require("sap.m.MessageBox");
	jQuery.sap.require("sap.m.MessageToast");

	sap.ui.controller("<%= fioriComponentNamespace %>.view.Detail", {

		onInit: function() {
			this.bus = sap.ui.getCore().getEventBus();
		},

		handleNavButtonPress: function() {
			this.bus.publish("nav", "back");
		},

		handleLineItemPress: function(evt) {
			this.bus.publish("nav", "to", {
				id: "idViewRoot--idViewLineItem",
				data: {
					context: evt.getSource().getBindingContext()
				}
			});
		},
		
		handleApprove: function() {
			// show confirmation dialog
			var bundle = this.getView().getModel("i18n").getResourceBundle();
			sap.m.MessageBox.confirm(
				bundle.getText("ApproveDialogMsg"),
				function(oAction) {
					if (sap.m.MessageBox.Action.OK === oAction) {
						// notify user
						var successMsg = bundle.getText("ApproveDialogSuccessMsg");
						sap.m.MessageToast.show(successMsg);
						// TODO call proper service method and update model (not part of this session)
					}
				},

				bundle.getText("ApproveDialogTitle")
			);
		}

	});

}());