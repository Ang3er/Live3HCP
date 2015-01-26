
				subroutes: [
					{
						pattern: "Detail/{contextPath}", // will be the url and from has to be provided in the data
						view: "Detail",
						name: "Detail" // name used for listening or navigating to this route
									},
					{
						pattern: "Tweets/{contextPath}", // will be the url and from has to be provided in the data
						view: "Tweets",
						name: "Tweets" // name used for listening or navigating to this route
									}]
				}]
