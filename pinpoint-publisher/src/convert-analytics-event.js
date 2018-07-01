
'use strict';

const flat = require('flat');

function parseEvent(event) {
	const clonedEvent = Object.assign({}, event);
	delete clonedEvent.tags;
	delete clonedEvent.timestamp;
	delete clonedEvent.receivedAt;
	return clonedEvent;
}

module.exports = function convertAnalyticsEvent(event, eventName) {
	const attributes = Object.assign({}, event.tags, flat(parseEvent(event), { delimiter: ' ' }));

	return {
		eventType: eventName,
		timestamp: new Date(event.receivedAt).toISOString(),
		attributes: attributes
	};
};
