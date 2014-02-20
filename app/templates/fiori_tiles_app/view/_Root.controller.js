(function() {
	"use strict";

	sap.ui.controller("<%= fioriComponentNamespace %>.view.Root", {
		onInit: function() {
			var bus = sap.ui.getCore().getEventBus();

			bus.subscribe("nav", "to", this.navToHandler, this);
			bus.subscribe("nav", "back", this.navBackHandler, this);

			this.app = this.getView().byId("idApp");
		},

		navToHandler: function(channelId, eventId, data) {
			//data.id holds the page id
			this.app.to(data.id);
			if (data.data.context) {
				this.app.getPage(data.id).setBindingContext(data.data.context);
			}

		},

		navBackHandler: function() {
			this.app.back();
		}

	});

}());