'use strict';

const createGenericEventFromLambda = require('./create-generic-lambda-event'),
	extractKeys = require('./extract-keys');

module.exports = function convertFromDesole(lambdaProxyEvent, lambdaContext) {
	const body = JSON.parse(lambdaProxyEvent.body),
		genericEvent = createGenericEventFromLambda(lambdaProxyEvent),
		desoleEvent = Object.assign(genericEvent, extractKeys(body, ['severity', 'stack', 'type', 'timestamp', 'resource', 'tags']));

	Object.assign(desoleEvent.endpoint, extractKeys(body.endpoint, ['id', 'platform', 'language']));
	desoleEvent.app = extractKeys(body.app, ['name', 'version', 'stage']);
	desoleEvent.id = lambdaContext.awsRequestId;
	return desoleEvent;
};
