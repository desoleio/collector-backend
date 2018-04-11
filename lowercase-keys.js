'use strict';
module.exports = function lowercaseKeys(object) {
	const result = {};
	if (object && typeof object === 'object' && !Array.isArray(object)) {
		Object.keys(object).forEach(key => result[key.toLowerCase()] = object[key]);
	}
	return result;
};
