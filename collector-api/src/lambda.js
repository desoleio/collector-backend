'use strict';
const AWS = require('aws-sdk'),
	sns = new AWS.SNS(),
	TOPIC_ARN = process.env.TOPIC_ARN,
	lowercaseKeys = require('./lowercase-keys'),
	uaParser = require('useragent'),
	extractKeys = require('./extract-keys'),
	extractDeviceType = function (headers) {
		return ['SmartTV', 'Mobile', 'Tablet', 'Desktop'].find(type => headers[`cloudfront-is-${type.toLowerCase()}-viewer`] === 'true');
	},
	validateEvent = function (desoleEvent) {
		return desoleEvent; // check fields etc
	},
	extract = function (lambdaProxyEvent, lambdaContext) {
		try {
			const body = JSON.parse(lambdaProxyEvent.body),
				normalizedHeaders = lowercaseKeys(lambdaProxyEvent.headers),
				userAgent = uaParser.parse(lambdaProxyEvent.requestContext.identity.userAgent),
				desoleEvent = extractKeys(body, ['severity', 'stack', 'category', 'timestamp', 'resource', 'tags']);
			desoleEvent.app = extractKeys(body.app, ['name', 'version', 'stage']);
			desoleEvent.id = lambdaContext.awsRequestId;
			desoleEvent.receivedAt = Date.now();
			desoleEvent.referrer = normalizedHeaders.referer;
			desoleEvent.endpoint = extractKeys(body.endpoint, ['id', 'platform', 'language']);
			Object.assign(desoleEvent.endpoint, {
				country: normalizedHeaders['cloudfront-viewer-country'],
				userAgent: lambdaProxyEvent.requestContext.identity.userAgent,
				deviceType: extractDeviceType(normalizedHeaders),
				runtime: userAgent.family,
				runtimeVersion: userAgent.toVersion(),
				os: userAgent.os.family,
				osVersion: userAgent.os.toVersion()
			});



			return validateEvent(desoleEvent);
		} catch (e) {
			console.log(e);
			return false;
		}
	};

exports.handler = (event, context) => {
	const desoleEvent = extract(event, context);
	if (!desoleEvent) {
		return Promise.resolve({status: 400, body: 'invalid-args'});
	}
	return sns.publish({
		Message: JSON.stringify(desoleEvent),
		TopicArn: TOPIC_ARN
	})
	.promise()
	.then(() => ({statusCode: 204, body: ''}))
	.catch(e => {
		console.log(e);
		return {statusCode: 500, body: 'server-error'};
	});
};
