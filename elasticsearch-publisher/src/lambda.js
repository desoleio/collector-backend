'use strict';
const AWS = require('aws-sdk'),
	elasticsearch = require('elasticsearch'),
	awsES = require('http-aws-es'),
	parseSNSEvent = require('@desole/common/src/parse-sns-event'),
	myCredentials = new AWS.EnvironmentCredentials('AWS'),
	index = process.env.ES_INDEX_NAME,
	documentType = process.env.ES_DOCUMENT_TYPE,
	client = new elasticsearch.Client({
		host: process.env.ES_DOMAIN_NAME,
		connectionClass: awsES,
		amazonES: {
			region: process.env.AWS_REGION,
			credentials: myCredentials
		}
	}),
	createPromise = util.promisify(client.create),
	storeSingleEvent = event => {
		console.log('storing', index, event.id);
		return createPromise({
			index: index,
			type: documentType,
			id: event.id,
			body: event
		});
	};

exports.handler = (event) => {
	const records = parseSNSEvent(event);
	return Promise.all(records.map(storeSingleEvent));
};
