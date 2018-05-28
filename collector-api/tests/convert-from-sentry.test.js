'use strict';
const convertFromSentry = require('../src/convert-from-sentry'),
	lambdaProxyEvent = require('./test-events/lambda-proxy-event'),
	wrapEvent = (event) => {
		const result = JSON.parse(JSON.stringify(lambdaProxyEvent));
		result.body = JSON.stringify(event);
		return result;
	};

describe('Convert from Sentry', () => {


	describe('Error type', () => {
		test('should pickup the error type if defined', () => {
			const event = wrapEvent(require('./test-events/raven-exception'));
			expect(convertFromSentry(event).type).toBe('TypeError');
		});

		test('should use runtime error type if undefined', () => {
			const event = wrapEvent(require('./test-events/raven-manually-tracked'));
			expect(convertFromSentry(event).type).toBe('RuntimeError');
		});
	});

	describe('Error message', () => {
		test('should pickup the message if exception value defined', () => {
			const event = wrapEvent(require('./test-events/raven-exception'));
			expect(convertFromSentry(event).message).toBe(`Cannot read property 'captureException' of undefined`);
		});

		test('should use body message if exception value undefined', () => {
			const event = wrapEvent(require('./test-events/raven-manually-tracked'));
			expect(convertFromSentry(event).message).toBe('error');
		});
	});
});


