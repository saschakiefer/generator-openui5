jQuery.sap.declare("<%= fioriComponentNamespace %>.Component");
jQuery.sap.require("<%= fioriComponentNamespace %>.MyRouter");

sap.ui.core.UIComponent.extend("<%= fioriComponentNamespace %>.Component", {
	metadata : {
		name : "<%= applicationName %>",
		version : "1.0",
		includes : [],
		dependencies : {
			libs : ["sap.m", "sap.ui.layout"],
			components : []
		},

		rootView : "<%= fioriComponentNamespace %>.view.App",

		config : {
			resourceBundle : "i18n/messageBundle.properties",
			serviceConfig : {
				name : "Northwind",
				serviceUrl : "/uilib-sample/proxy/http/services.odata.org/V2/(S(sapuidemotdg))/OData/OData.svc/"
			}
		},

		routing : {
			config : {
				routerClass : <%= fioriComponentNamespace %>.MyRouter,
				viewType : "XML",
				viewPath : "<%= fioriComponentNamespace %>.view",
				targetAggregation : "detailPages",
				clearTarget : false
			},
			routes : [
				{
					pattern : "",
					name : "main",
					view : "Master",
					targetAggregation : "masterPages",
					targetControl : "idAppControl",
					subroutes : [
						{
							pattern : "{product}/:tab:",
							name : "product",
							view : "Detail"
						}
					]
				},
				{
					name : "catchallMaster",
					view : "Master",
					targetAggregation : "masterPages",
					targetControl : "idAppControl",
					subroutes : [
						{
							pattern : ":all*:",
							name : "catchallDetail",
							view : "NotFound",
							transition : "show"
						}
					]
				}
			]
		}
	},

	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

		var mConfig = this.getMetadata().getConfig();

		// always use absolute paths relative to our own component
		// (relative paths will fail if running in the Fiori Launchpad)
		var rootPath = jQuery.sap.getModulePath("<%= fioriComponentNamespace %>");

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : [rootPath, mConfig.resourceBundle].join("/")
		});
		this.setModel(i18nModel, "i18n");

		var sServiceUrl = mConfig.serviceConfig.serviceUrl;

		var bIsMocked = jQuery.sap.getUriParameters().get("responderOn") === "true";
		// start the mock server for the domain model
		if (bIsMocked) {
			jQuery.sap.require("sap.ui.app.MockServer");
			var oMockServer = new sap.ui.app.MockServer({
				rootUri: sServiceUrl
			});
			oMockServer.simulate("model/metadata.xml", "model/");
			oMockServer.start();

			sap.m.MessageToast.show("Running in demo mode with mock data.", {
				duration: 2000
			});
		}

		// Create and set domain model to the component
		var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		this.setModel(oModel);

		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isTouch : sap.ui.Device.support.touch,
			isNoTouch : !sap.ui.Device.support.touch,
			isPhone : sap.ui.Device.system.phone,
			isNoPhone : !sap.ui.Device.system.phone,
			listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
			listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		this.setModel(deviceModel, "device");

		this.getRouter().initialize();

	}

});

