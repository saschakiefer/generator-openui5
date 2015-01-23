sap.ui.core.UIComponent.extend("<%= fioriComponentNamespace %>.Component", {
	metadata: {
		name: "<%= applicationName %>",
		version: "'1.0.0",
		includes: ["css/styles.css"],
		dependencies: {
			libs: ["sap.m"]
		},
		rootView: "<%= fioriComponentNamespace %>.view.App"
	}
});
