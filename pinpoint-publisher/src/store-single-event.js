
'use strict';

const convertClientContext = require('./convert-client-context'),
	convertAnalyticsEvent = require('./convert-analytics-event');

module.exports = function storeSingleEvent(event, mobileAnalytics, pinpoint, env) {


	const clientContext = convertClientContext(event, env.MOBILE_HUB_APPLICATION),
		analyticsEvent = convertAnalyticsEvent(event, env.EVENT_NAME);

	return pinpoint.updateEndpoint({
		ApplicationId: env.MOBILE_HUB_APPLICATION,
		EndpointId: event.endpoint.id,
		EndpointRequest: {
			Demographic: {
				AppVersion: event.app.version,
				Locale: event.endpoint.language,
				Make: event.endpoint.platform,
				Platform: event.endpoint.os,
				PlatformVersion: event.endpoint.osVersion,
				Model: event.endpoint.runtime,
				ModelVersion: event.endpoint.runtimeVersion
			},
			Location: {
				Country: event.endpoint.country
			}
		}
	}).promise()
		.then(() => mobileAnalytics.putEvents({
			clientContext: JSON.stringify(clientContext),
			events: [analyticsEvent]
		}).promise());
};
