'use strict';

const convertAnalyticsEvent = require('../src/convert-analytics-event'),
	eventTemplate = require('./test-events/sample-event.json');

describe('convertAnlyticsEvent', () => {

	let sampleEvent;

	beforeEach(() => {
		sampleEvent = JSON.parse(JSON.stringify(eventTemplate));
	});

	test('should flatten all event attributes', () => {
		const convertedEvent = convertAnalyticsEvent(sampleEvent, 'test event');

		expect(convertedEvent).toEqual({
			eventType: 'test event',
			timestamp: '2018-07-01T00:48:05.926Z',
			attributes:
			{
				severity: 'error',
				stack: 'com.gargoylesoftware.htmlunit.ScriptException: TypeError: Cannot find default value for object. (https://dashboard.vacationtracker.io:443/polyfills.569c7d225d020fab25d6.bundle.js#1)',
				resource: '',
				'app name': 'STG Dashboard',
				'app version': '1.0.0',
				'app stage': 'prod',
				id: '6a9ff062-7cc8-11e8-ba99-d99efe337df0',
				referrer: '',
				'endpoint id': '1ea0ce11-cf8b-4015-9124-d37709175e9a',
				'endpoint platform': 'MacIntel',
				'endpoint language': 'en-US',
				'endpoint country': 'US',
				'endpoint userAgent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
				'endpoint deviceType': 'Desktop',
				'endpoint runtime': 'Chrome',
				'endpoint runtimeVersion': '56.0.2924',
				'endpoint os': 'Windows',
				'endpoint osVersion': '7.0.0'
			}
		});
	});

	test('should merge tags with attributes', () => {
		sampleEvent.tags = { UserType: 'free' };
		const convertedEvent = convertAnalyticsEvent(sampleEvent, 'test event');

		expect(convertedEvent).toEqual({
			eventType: 'test event',
			timestamp: '2018-07-01T00:48:05.926Z',
			attributes:
			{
				'UserType': 'free',
				severity: 'error',
				stack: 'com.gargoylesoftware.htmlunit.ScriptException: TypeError: Cannot find default value for object. (https://dashboard.vacationtracker.io:443/polyfills.569c7d225d020fab25d6.bundle.js#1)',
				resource: '',
				'app name': 'STG Dashboard',
				'app version': '1.0.0',
				'app stage': 'prod',
				id: '6a9ff062-7cc8-11e8-ba99-d99efe337df0',
				referrer: '',
				'endpoint id': '1ea0ce11-cf8b-4015-9124-d37709175e9a',
				'endpoint platform': 'MacIntel',
				'endpoint language': 'en-US',
				'endpoint country': 'US',
				'endpoint userAgent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
				'endpoint deviceType': 'Desktop',
				'endpoint runtime': 'Chrome',
				'endpoint runtimeVersion': '56.0.2924',
				'endpoint os': 'Windows',
				'endpoint osVersion': '7.0.0'
			}
		});
	});

	test('should not override standard keys with tags', () => {
		sampleEvent.tags = { severity: 'free' };
		const convertedEvent = convertAnalyticsEvent(sampleEvent, 'test event');

		expect(convertedEvent).toEqual({
			eventType: 'test event',
			timestamp: '2018-07-01T00:48:05.926Z',
			attributes:
			{
				severity: 'error',
				stack: 'com.gargoylesoftware.htmlunit.ScriptException: TypeError: Cannot find default value for object. (https://dashboard.vacationtracker.io:443/polyfills.569c7d225d020fab25d6.bundle.js#1)',
				resource: '',
				'app name': 'STG Dashboard',
				'app version': '1.0.0',
				'app stage': 'prod',
				id: '6a9ff062-7cc8-11e8-ba99-d99efe337df0',
				referrer: '',
				'endpoint id': '1ea0ce11-cf8b-4015-9124-d37709175e9a',
				'endpoint platform': 'MacIntel',
				'endpoint language': 'en-US',
				'endpoint country': 'US',
				'endpoint userAgent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
				'endpoint deviceType': 'Desktop',
				'endpoint runtime': 'Chrome',
				'endpoint runtimeVersion': '56.0.2924',
				'endpoint os': 'Windows',
				'endpoint osVersion': '7.0.0'
			}
		});
	});

	test('should not mutate original even', () => {
		convertAnalyticsEvent(sampleEvent, 'test event');
		expect(sampleEvent).toEqual(eventTemplate);
	});

	test('should work when the event does not contain tags', () => {
		delete sampleEvent.tags;
		const convertedEvent = convertAnalyticsEvent(sampleEvent, 'test event');

		expect(convertedEvent).toEqual({
			eventType: 'test event',
			timestamp: '2018-07-01T00:48:05.926Z',
			attributes:
			{
				severity: 'error',
				stack: 'com.gargoylesoftware.htmlunit.ScriptException: TypeError: Cannot find default value for object. (https://dashboard.vacationtracker.io:443/polyfills.569c7d225d020fab25d6.bundle.js#1)',
				resource: '',
				'app name': 'STG Dashboard',
				'app version': '1.0.0',
				'app stage': 'prod',
				id: '6a9ff062-7cc8-11e8-ba99-d99efe337df0',
				referrer: '',
				'endpoint id': '1ea0ce11-cf8b-4015-9124-d37709175e9a',
				'endpoint platform': 'MacIntel',
				'endpoint language': 'en-US',
				'endpoint country': 'US',
				'endpoint userAgent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
				'endpoint deviceType': 'Desktop',
				'endpoint runtime': 'Chrome',
				'endpoint runtimeVersion': '56.0.2924',
				'endpoint os': 'Windows',
				'endpoint osVersion': '7.0.0'
			}
		});
	});
});
