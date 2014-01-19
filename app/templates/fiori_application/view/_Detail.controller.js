(function() {
	"use strict";

	jQuery.sap.require("<%= fioriComponentNamespace %>.util.Formatter");
	jQuery.sap.require("sap.m.MessageBox");
	jQuery.sap.require("sap.m.MessageToast");

	sap.ui.controller("<%= fioriComponentNamespace %>.view.Detail", {

		handleNavButtonPress: function() {
			this.navigation.navBack();
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
		},

		handleLineItemPress: function(evt) {
			this.navigation.navTo("idViewRoot--idViewLineItem", evt.getSource().getBindingContext());
		}
	});

}());