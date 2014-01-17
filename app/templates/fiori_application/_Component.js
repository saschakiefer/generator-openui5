/*
Component details:
	- Main Control: sap.m.SplitApp (wrapped in sap.m.Shell to center app on screen
					and limit width - remove if you want a fullscreen app)
	- Views: XML
	- Navigation: EventBus
*/
jQuery.sap.declare("<%= fioriComponentNamespace %>.Component");

sap.ui.core.UIComponent.extend("<%= fioriComponentNamespace %>.Component", {

	createContent: function() {

		// create root view
		var oView = sap.ui.view({
			id: "idViewRoot",
			viewName: "<%= fioriComponentNamespace %>.view.Root",
			type: "XML",
			viewData: {
				component: this
			}
		});

		// set data model on root view
		oView.setModel(new sap.ui.model.json.JSONModel("model/mock.json"));

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: "i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone: jQuery.device.is.phone,
			listMode: (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType: (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");

		// done
		return oView;
	}
});