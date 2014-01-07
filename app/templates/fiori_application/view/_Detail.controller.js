jQuery.sap.require("<%= fioriComponentNamespace %>.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("<%= fioriComponentNamespace %>.view.Detail", {

	handleNavButtonPress: function(evt) {
		this.nav.back("Master");
	},

	handleApprove: function(evt) {

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
		var context = evt.getSource().getBindingContext();
		this.nav.to("LineItem", context);
	}
});