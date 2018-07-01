'use strict';

module.exports = function convertClientContext(event, mobileHubApplication) {
	return {
		client: {
			client_id: event.endpoint.id
		},
		services: {
			mobile_analytics: {
				app_id: mobileHubApplication
			}
		}
	};
};
