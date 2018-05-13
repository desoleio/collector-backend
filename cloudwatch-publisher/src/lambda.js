'use strict';
const AWS = require('aws-sdk'),
	cloudWatch = new AWS.CloudWatch(),
	parseSNSEvent = require('@desole/common/src/parse-sns-event'),
	CLOUDWATCH_NAMESPACE = process.env.CLOUDWATCH_NAMESPACE,
	toDimension = (name, value) => ({Name: name, Value: value || '-'}),
	convertToSeverityMetricData = function (event) {
		return {
			MetricName: 'Count',
			Unit: 'Count',
			Value: 1.0,
			Dimensions: [
				toDimension('App Name', event.app.name),
				toDimension('App Stage', event.app.stage),
				toDimension('Severity', event.severity)
			],
			StorageResolution: 1,
			Timestamp: new Date(event.receivedAt)
		};
	},
	convertToTypeMetricData = function (event) {
		return {
			MetricName: 'Count',
			Unit: 'Count',
			Value: 1.0,
			Dimensions: [
				toDimension('App Name', event.app.name),
				toDimension('App Stage', event.app.stage),
				toDimension('Type', event.type)
			],
			StorageResolution: 1,
			Timestamp: new Date(event.receivedAt)
		};
	},
	storeSingleEvent = event => {
		const params = {
			MetricData: [convertToSeverityMetricData(event), convertToTypeMetricData(event)],
			Namespace: CLOUDWATCH_NAMESPACE
		};
		return cloudWatch.putMetricData(params).promise();
	};

exports.handler = (event) => {
	const records = parseSNSEvent(event);
	return Promise.all(records.map(storeSingleEvent));
};
