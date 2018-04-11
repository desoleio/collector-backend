'use strict';
const AWS = require('aws-sdk'),
	mobileAnalytics = new AWS.MobileAnalytics(),
	parseSNSEvent = require('@desole/common/src/parse-sns-event'),
	flat = require('flat'),
	MOBILE_HUB_APPLICATION = process.env.MOBILE_HUB_APPLICATION,
	EVENT_NAME = process.env.EVENT_NAME,
	storeSingleEvent = event => {
		const clientContext = {
				client: {
					client_id: event.endpoint.id,
					app_title: event.app.name,
					app_version_name: event.app.stage,
					app_version_code: event.app.version
				},
				env: {
					platform: event.endpoint.platform
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
				attributes: flat(event)
			};
		delete analyticsEvent.attributes.timestamp;
		delete analyticsEvent.attributes.receivedAt;
		return mobileAnalytics.putEvents({
			clientContext: JSON.stringify(clientContext),
			events: [analyticsEvent]
		}).promise();
	};

exports.handler = (event) => {
	if (!MOBILE_HUB_APPLICATION || !EVENT_NAME) {
		return Promise.resolve();
	}
	const records = parseSNSEvent(event);
	return Promise.all(records.map(storeSingleEvent));
};
