'use strict';
const AWS = require('aws-sdk'),
	parseSNSEvent = require('@desole/common/src/parse-sns-event'),
	s3 = new AWS.S3(),
	BUCKET_NAME = process.env.BUCKET_NAME,
	BUCKET_PREFIX = process.env.BUCKET_PREFIX || 'archive',
	calculateS3Key = function (event) {
		const date = new Date(event.receivedAt),
			year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate();
		return [BUCKET_PREFIX, event.app.name, event.app.stage, year, month, day, event.severity, event.category, event.id].join('/');
	},
	storeSingleEvent = event => {
		return s3.putObject({
			Key: calculateS3Key(event),
			Bucket: BUCKET_NAME,
			ContentType: 'application/json',
			Body: JSON.stringify(event, null, 2)
		}).promise();
	};

exports.handler = (event) => {
	const records = parseSNSEvent(event);
	return Promise.all(records.map(storeSingleEvent));
};
