(function() {
	"use strict";

	sap.ui.jsview("<%= fioriComponentNamespace %>.view.Home", {

		getControllerName: function() {
			return "<%= fioriComponentNamespace %>.view.Home";
		},

		createContent: function(oController) {

			var controls = [];
			var oTileCont = new sap.m.TileContainer("tileCont", {});

			// Tile Template
			var oTileTmpl = new sap.m.StandardTile({
				number: {
					path: "CategoryID",
					formatter: oController.productCount
				},
				numberUnit: "Products",
				icon: "sap-icon://action",
				title: "{CategoryName}",
				info: "{Description}",
				press: [oController.handleTileTap, oController] // Must bind to controller!
			});

			// Bind Categories use template to build tiles,
			oTileCont.bindAggregation("tiles", {
				path: "/Categories",
				template: oTileTmpl,
				parameters: { expand: "Products" }
			});

			var page = new sap.m.Page(this.createId("idViewHome"), { title: "Products by Category" });
			page.setEnableScrolling(false);
			page.addContent(oTileCont);

			controls.push(page);
			return controls;
		}
	});
}());