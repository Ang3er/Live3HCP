sap.ui.core.mvc.Controller.extend("live3.view.Detail", {

	onInit: function() {
		var view = this.getView();

		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
			// when detail navigation occurs, update the binding context
			if (oEvent.getParameter("name") === "Detail") {
				var context = new sap.ui.model.Context(view.getModel(), "/" + oEvent.getParameter("arguments").contextPath);
				view.setBindingContext(context);
				// Make sure the master is here
			}
		}, this);
	},

	handleSelect: function(oEvent) {
		var oListItem = oEvent.getParameter("listItem") || oEvent.getSource();

		// trigger routing to BindingPath of this ListItem - this will update the data on the detail page
		sap.ui.core.UIComponent.getRouterFor(this).navTo("Tweets", {
			from: "Detail",
			contextPath: oListItem.getBindingContext().getPath().substr(1)
		});
	},

	handleNavButtonPress: function() {
		var history = sap.ui.core.routing.History.getInstance();
		var router = sap.ui.core.UIComponent.getRouterFor(this);
		var url = router.getURL("master", {});
		var direction = history.getDirection(url);
		if (direction === "Backwards") {
			/* eslint-disable */
			window.history.go(-1);
			/* eslint-enable */
		} else {
			router.navTo("master", {}, true); // otherwise we go backwards with a forward history
		}
	}
});