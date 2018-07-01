'use strict';
const AWS = require('aws-sdk'),
	mobileAnalytics = new AWS.MobileAnalytics(),
	pinpoint = new AWS.Pinpoint(),
	parseSNSEvent = require('@desole/common/src/parse-sns-event'),
	storeSingleEvent = require('./store-single-event');

exports.handler = (event) => {
	if (!process.env.MOBILE_HUB_APPLICATION || !process.env.EVENT_NAME) {
		return Promise.resolve();
	}
	const records = parseSNSEvent(event);
	return Promise.all(records.map(record => storeSingleEvent(record, mobileAnalytics, pinpoint, process.env)));
};
