'use strict';
const AWS = require('aws-sdk'),
	sns = new AWS.SNS(),
	TOPIC_ARN = process.env.TOPIC_ARN,
	lowercaseKeys = require('./lowercase-keys'),
	extractKeys = require('./extract-keys'),
	extractDeviceType = function (headers) {
		return ['SmartTV', 'Mobile', 'Tablet', 'Desktop'].find(type => headers[`cloudfront-is-${type.toLowerCase()}`] === 'true');
	},
	validateEvent = function (desoleEvent) {
		return desoleEvent; // check fields etc
	},
	extract = function (lambdaProxyEvent, lambdaContext) {
		try {
			const body = JSON.parse(lambdaProxyEvent.body),
				normalizedHeaders = lowercaseKeys(lambdaProxyEvent.headers),
				desoleEvent = extractKeys(body, ['severity', 'stack', 'category', 'timestamp', 'endpointId', 'tags']);

			desoleEvent.app = extractKeys(body.app, ['name', 'version', 'stage']);
			desoleEvent.endpointMetadata = extractKeys(body.endpointMetadata, ['pageUrl', 'language']);
			desoleEvent.id = lambdaContext.awsRequestId;
			desoleEvent.receivedAt = Date.now();
			desoleEvent.endpointMetadata.referrer = normalizedHeaders.referrer;
			desoleEvent.endpointMetadata.country = normalizedHeaders['cloudFront-viewer-country'];
			desoleEvent.endpointMetadata.ip = lambdaProxyEvent.requestContext.identity.sourceIp;
			desoleEvent.endpointMetadata.forwardedIps = normalizedHeaders['x-forwarded-for'];
			desoleEvent.endpointMetadata.userAgent = lambdaProxyEvent.requestContext.identity.userAgent;
			desoleEvent.endpointMetadata.deviceType = extractDeviceType(normalizedHeaders);
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
