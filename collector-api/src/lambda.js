'use strict';
const AWS = require('aws-sdk'),
	sns = new AWS.SNS(),
	TOPIC_ARN = process.env.TOPIC_ARN,
	converters = {'/desole': require('./convert-from-desole'), '/sentry': require('./convert-from-sentry')},

	htmlResponse = function (body, requestedCode) {
		const code = requestedCode || (body ? 200 : 204);
		return {
			statusCode: code,
			body: body || '',
			headers: {
				'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
				'Access-Control-Allow-Methods': 'OPTIONS,POST',
				'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
				'Access-Control-Max-Age': '86400'
			}
		};
	},
	getConvertedEvent = (event, context) => {
		try {
			const converter = converters[event.path];
			return converter(event, context);
		} catch (e) {
			console.error(e);
		}
	};

exports.handler = (event, context) => {
	if (event.httpMethod === 'OPTIONS') {
		return Promise.resolve(htmlResponse());
	}
	const desoleEvent = getConvertedEvent(event, context);
	if (!desoleEvent) {
		return Promise.resolve(htmlResponse('invalid-args', 400));
	}
	return sns.publish({
		Message: JSON.stringify(desoleEvent),
		TopicArn: TOPIC_ARN
	})
	.promise()
	.then(() => htmlResponse())
	.catch(e => {
		console.log(e);
		return htmlResponse('server-error', 500);
	});
};
