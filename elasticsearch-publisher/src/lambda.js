'use strict';
const AWS = require('aws-sdk'),
	elasticsearch = require('elasticsearch'),
	awsES = require('http-aws-es'),
	util = require('util'),
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
	storeSingleEvent = event => {
		const params = {
			index: index,
			type: documentType,
			id: event.id,
			body: event
		};
		return new Promise((resolve, reject) => {
			client.create(params, (err, result) => {
				if (err) {
					return reject(err);
				}
				resolve(result);
			});
		});
	};

exports.handler = (event) => {
	const records = parseSNSEvent(event);
	return Promise.all(records.map(storeSingleEvent));
};
