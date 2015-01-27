(function() {
	"use strict";

	sap.ui.core.mvc.Controller.extend("<%= fioriComponentNamespace %>.view.Master", {

		handleSearch: function() {
			// add filter for search
			var filters = [];
			var searchString = this.getView().byId("searchField").getValue();
			if (searchString && searchString.length > 0) {
				filters = [ new sap.ui.model.Filter("ProductName", sap.ui.model.FilterOperator.Contains, searchString) ];
			}

			// update list binding
			var list = this.getView().byId("list");
			var binding = list.getBinding("items");
			binding.filter(filters);
		},

		handleSelect: function(oEvent) {
			var oListItem = oEvent.getParameter("listItem") || oEvent.getSource();

			// trigger routing to BindingPath of this ListItem - this will update the data on the detail page
			sap.ui.core.UIComponent.getRouterFor(this).navTo("Detail",{from: "master", contextPath: oListItem.getBindingContext().getPath().substr(1)});
		}
	});

}());
