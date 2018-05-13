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
	},
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
	};

exports.handler = (event, context) => {
	if (event.httpMethod === 'OPTIONS') {
		return Promise.resolve(htmlResponse());
	}
	const desoleEvent = extract(event, context);
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
