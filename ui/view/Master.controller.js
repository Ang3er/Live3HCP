jQuery.sap.require("sap.m.MessageToast");

var servicesPath = "/destinations/hanaxs/p000trial/dev/live3/";

sap.ui.core.mvc.Controller.extend("live3.view.Master", {

	handleSelect: function(oEvent) {
		var oListItem = oEvent.getParameter("listItem") || oEvent.getSource();

		// trigger routing to BindingPath of this ListItem - this will update the data on the detail page
		sap.ui.core.UIComponent.getRouterFor(this).navTo("Detail", {
			from: "master",
			contextPath: oListItem.getBindingContext().getPath().substr(1)
		});
	},

	handleStartDialog: function() {
		if (!this.dlgStart) {
			this.dlgStart = sap.ui.xmlfragment("live3.view.Start", this);
			this.getView().addDependent(this.dlgStart);
		}
		this.dlgStart.open();
	},

	handleStartDialogClose: function(oEvent) {
		if (oEvent.getSource().getId() === "ok") {
			var track = encodeURI(sap.ui.getCore().byId("iTrack").getValue());
			$.ajax({
				url: "/destinations/nodejs/do/start",
				type: "get",
				data: {
					track: track
				},
				error: function() {
					sap.m.MessageToast.show("Start error.");
				},
				success: function() {
					sap.m.MessageToast.show("Started.");
				}
			});
		}
		this.dlgStart.close();
	},

	handleStop: function() {
		$.ajax({
			url: "/destinations/nodejs/do/stop",
			type: "get",
			error: function() {
				sap.m.MessageToast.show("Stop error.");
			},
			success: function() {
				sap.m.MessageToast.show("Stopped.");
			}
		});
	},

	handleCluster: function() {
		$.ajax({
			url: servicesPath + "services.xsjs?cmd=cluster",
			type: "get",
			async: "false",
			error: function() {
				sap.m.MessageToast.show("Clustering error.");
			},
			success: function() {
				sap.m.MessageToast.show("Clustering finished.");
			}
		});
		this.getView().getModel().refresh();
	},

	handleReset: function() {
		$.ajax({
			url: servicesPath + "services.xsjs?cmd=reset",
			type: "get",
			async: "false",
			error: function() {
				sap.m.MessageToast.show("Reset error.");
			},
			success: function() {
				sap.m.MessageToast.show("Reset finished.");
			}
		});
		this.getView().getModel().refresh();
	},

	handleRefresh: function() {
		$.ajax({
			url: servicesPath + "services.xsodata/Tweets/$count",
			type: "get",
			error: function() {},
			success: function(data) {
				jQuery.sap.require("sap.m.MessageToast");
				sap.m.MessageToast.show("Tweets: " + data, {
					duration: 1000,
					my: "center top",
					at: "center top"
				});
			}
		});
		this.getView().getModel().refresh();
		this.getView().byId("pullToRefresh").hide();
	}

});