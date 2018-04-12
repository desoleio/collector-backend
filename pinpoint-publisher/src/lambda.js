'use strict';
const AWS = require('aws-sdk'),
	mobileAnalytics = new AWS.MobileAnalytics(),
	pinpoint = new AWS.Pinpoint(),
	parseSNSEvent = require('@desole/common/src/parse-sns-event'),
	flat = require('flat'),

	MOBILE_HUB_APPLICATION = process.env.MOBILE_HUB_APPLICATION,
	EVENT_NAME = process.env.EVENT_NAME,

	storeSingleEvent = event => {
		const clientContext = {
				client: {
					client_id: event.endpoint.id
				},
				services: {
					mobile_analytics: {
						app_id: MOBILE_HUB_APPLICATION
					}
				}
			},
			analyticsEvent = {
				eventType: EVENT_NAME,
				timestamp: new Date(event.receivedAt).toISOString(),
				attributes: flat(event, {delimiter: ' '})
			};
		delete analyticsEvent.attributes.timestamp;
		delete analyticsEvent.attributes.receivedAt;
		return pinpoint.updateEndpoint({
			ApplicationId: MOBILE_HUB_APPLICATION,
			EndpointId: event.endpoint.id,
			EndpointRequest: {
				Attributes: {
					'deviceType': event.endpoint.deviceType
				},
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

exports.handler = (event) => {
	if (!MOBILE_HUB_APPLICATION || !EVENT_NAME) {
		return Promise.resolve();
	}
	const records = parseSNSEvent(event);
	return Promise.all(records.map(storeSingleEvent));
};
