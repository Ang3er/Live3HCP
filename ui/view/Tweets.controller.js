sap.ui.core.mvc.Controller.extend("live3.view.Tweets", {

	onInit: function() {
		var view = this.getView();

		sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
			// when tweet navigation occurs, update the binding context
			if (oEvent.getParameter("name") === "Tweets") {
				var context = new sap.ui.model.Context(view.getModel(), "/" + oEvent.getParameter("arguments").contextPath);
				view.setBindingContext(context);
			}
		}, this);
	},

	handleNavButtonPress: function() {
		/* eslint-disable */
		window.history.go(-1);
		/* eslint-enable */
	}
});