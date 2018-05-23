'use strict';

const createGenericLambdaEvent = require('./create-generic-lambda-event'),
	getRavenStacktraces = require('./get-raven-stacktraces'),
	extractBreadcrumbTimeStamp = breadcrumbs => {
		const unixTimestamp = breadcrumbs && Array.isArray(breadcrumbs.values) && breadcrumbs.values[breadcrumbs.values.length - 1].timestamp;
		return Math.floor(unixTimestamp * 1000);
	};

module.exports = function convertFromSentry(lambdaProxyEvent, lambdaContext) {
	const body = JSON.parse(lambdaProxyEvent.body),
		exception = body.exception.values[0],
		breadcrumbs = body.breadcrumbs,
		desoleEvent = Object.assign(createGenericLambdaEvent(lambdaProxyEvent), {
			severity: body.level || 'error',
			stack: getRavenStacktraces(exception),
			type: exception.type,
			message: exception.value,
			timestamp: extractBreadcrumbTimeStamp(breadcrumbs),
			resource: body.request.url,
			tags: body.tags
		});
	desoleEvent.endpoint.id = body.user && body.user.id;
	desoleEvent.endpoint.platform = body.platform;
	desoleEvent.app = {
		name: body.project,
		version: body.release,
		stage: body.environment
	};
	desoleEvent.id = lambdaContext.event_id;
	return desoleEvent;
};


