'use strict';
const uaParser = require('useragent'),
	lowercaseKeys = require('./lowercase-keys'),
	extractDeviceType = (headers) => {
		return ['SmartTV', 'Mobile', 'Tablet', 'Desktop'].find(type => headers[`cloudfront-is-${type.toLowerCase()}-viewer`] === 'true');
	};

module.exports = function createGenericEventFromLambda(lambdaProxyEvent) {
	const desoleEvent = {},
		normalizedHeaders = lowercaseKeys(lambdaProxyEvent.headers),
		userAgent = uaParser.parse(lambdaProxyEvent.requestContext.identity.userAgent);
	desoleEvent.receivedAt = Date.now();
	desoleEvent.referrer = normalizedHeaders.referer;
	desoleEvent.endpoint = {
		country: normalizedHeaders['cloudfront-viewer-country'],
		userAgent: lambdaProxyEvent.requestContext.identity.userAgent,
		deviceType: extractDeviceType(normalizedHeaders),
		runtime: userAgent.family,
		runtimeVersion: userAgent.toVersion(),
		os: userAgent.os.family,
		osVersion: userAgent.os.toVersion()
	};
	return desoleEvent;
};

