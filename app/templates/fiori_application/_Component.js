(function() {
	"use strict";

	jQuery.sap.declare("<%= fioriComponentNamespace %>.Component");
	jQuery.sap.require("sap.m.routing.RouteMatchedHandler");

	sap.ui.core.UIComponent.extend("<%= fioriComponentNamespace %>.Component", {

		metadata: {
			"name": "<%= applicationName %>",
			"version": "1.0.0",
			"includes": [],
			"dependencies": {
				"libs": ["sap.m", "sap.me", "sap.ushell"],
				"components": []
			},

			"config": {
				"resourceBundle": "i18n/messageBundle.properties",
				"titleResource": "SHELL_TITLE",
				"serviceConfig": {
					name: "northwind.svc",
					serviceUrl: "/destinations/northwind/V3/northwind/northwind.svc/"
				}
			},

			"routing": {
				config: {
					viewType: "XML",
					viewPath: "<%= fioriComponentNamespace %>.view",
					targetAggregation: "detailPages",
					clearTarget: false
				},
				routes:
					[{
						pattern: "",
						name: "master",
						view: "Master",
						targetAggregation: "masterPages",
						preservePageInSplitContainer: true,
						targetControl: "fioriContent",
						subroutes: [
							{
								pattern: "Detail/{contextPath}",
								view: "Detail",
								name: "Detail"
							}
						]
					}]
			}
		},

		init: function() {
			sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

			this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this.getRouter());
			// this component should automatically initialize the router
			this.getRouter().initialize();

			var oMetadataConfig = this.getMetadata().getConfig();
			var oServiceConfig = oMetadataConfig.serviceConfig;
			var sServiceUrl = oServiceConfig.serviceUrl;

			// always use absolute paths relative to our own component
			// (relative paths will fail if running in the Fiori Launchpad)
			var rootPath = jQuery.sap.getModulePath("<%= fioriComponentNamespace %>");

			// if proxy needs to be used for local testing...
			var sProxyOn = jQuery.sap.getUriParameters().get("proxyOn");
			var bUseProxy = (sProxyOn === "true");
			if (bUseProxy) {
				sServiceUrl = rootPath + "/proxy" + sServiceUrl;
			}

			// start mock server if required
			var responderOn = jQuery.sap.getUriParameters().get("responderOn");
			var bUseMockData = (responderOn === "true");
			// var bUseMockData = true;
			if (bUseMockData) {
				jQuery.sap.require("sap.ui.core.util.MockServer");
				var oMockServer = new sap.ui.core.util.MockServer({
					rootUri: sServiceUrl.replace(/\/?$/, "/")
				});
				oMockServer.simulate(rootPath + "/model/metadata.xml", rootPath + "/model/");
				oMockServer.start();

				var msg = "Running in demo mode with mock data."; // not translated because only for development scenario
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show(msg, {
					duration: 4000
				});
			}

			// set i18n model
			var i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleUrl : rootPath + "/i18n/messageBundle.properties"
			});
			this.setModel(i18nModel, "i18n");

			// set data model
			var m = new sap.ui.model.odata.ODataModel(sServiceUrl, {json: true,loadMetadataAsync: true});
			this.setModel(m);

			// set device model
			var deviceModel = new sap.ui.model.json.JSONModel({
				isTouch : sap.ui.Device.support.touch,
				isNoTouch : !sap.ui.Device.support.touch,
				isPhone : jQuery.device.is.phone,
				isNoPhone : !jQuery.device.is.phone,
				listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
				listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
			});
			deviceModel.setDefaultBindingMode("OneWay");
			this.setModel(deviceModel, "device");
		},

		/**
		* Initialize the application
		*
		* @returns {sap.ui.core.Control} the content
		*/
		createContent: function() {
			var oViewData = {
				component : this
			};
			return sap.ui.view({
				viewName : "<%= fioriComponentNamespace %>.view.App",
				type : sap.ui.core.mvc.ViewType.XML,
				viewData : oViewData
			});
		}
	});

}());
