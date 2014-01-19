(function() {
	"use strict";

	jQuery.sap.require("<%= fioriComponentNamespace %>.util.Formatter");
	jQuery.sap.require("<%= fioriComponentNamespace %>.util.Grouper");

	sap.ui.controller("<%= fioriComponentNamespace %>.view.Master", {

		onExit: function() {
			if (this._lineItemViewDialog) {
				this._lineItemViewDialog.destroy();
				this._lineItemViewDialog = null;
			}
		},

		handleListItemPress: function(evt) {
			var context = evt.getSource().getBindingContext();
			this.nav.to("Detail", context);
		},

		handleSearch: function(evt) {

			// create model filter
			var filters = [];
			var query = evt.getParameter("query");
			if (query && query.length > 0) {
				var filter = new sap.ui.model.Filter("SoId", sap.ui.model.FilterOperator.Contains, query);
				filters.push(filter);
			}

			// update list binding
			var list = this.getView().byId("list");
			var binding = list.getBinding("items");
			binding.filter(filters);
		},

		handleListSelect: function(evt) {
			this.navigation.navTo("idViewRoot--idViewDetail", evt.getParameter("listItem").getBindingContext());
		},

		handleViewSettings: function() {

			// create dialog
			var that = this;
			if (!this._lineItemViewDialog) {
				this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
					groupItems: [
						new sap.m.ViewSettingsItem({
							text: "Price",
							key: "GrossAmount"
						}),
						new sap.m.ViewSettingsItem({
							text: "Status",
							key: "BillingStatus"
						})
					],
					confirm: function(evt) {
						var aSorters = [];
						var mParams = evt.getParameters();
						if (mParams.groupItem) {
							var sPath = mParams.groupItem.getKey();
							var bDescending = mParams.groupDescending;
							var vGroup = <%= fioriComponentNamespace %> .util.Grouper[sPath];
							aSorters.push(new sap.ui.model.Sorter(sPath, bDescending, vGroup));
						}
						var oBinding = that.getView().byId("list").getBinding("items");
						oBinding.sort(aSorters);
					}
				});
			}

			// open dialog
			this._lineItemViewDialog.open();
		}
	});

}());