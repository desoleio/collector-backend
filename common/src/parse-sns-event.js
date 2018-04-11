'use strict';
module.exports = function parseSNSEvent(event) {
	const extractSns = record => record.Sns && record.Sns.Message && JSON.parse(record.Sns.Message);
	if (!event || !event.Records || !Array.isArray(event.Records)) {
		return [];
	}
	return event.Records.map(extractSns).filter(x => x);
};

