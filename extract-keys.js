'use strict';

module.exports = function extractKeys(pickFrom, keys) {

	if (!pickFrom || !pickFrom.hasOwnProperty || !keys || !Array.isArray(keys)) {
		throw 'invalid-args';
	}
	const picked = {};
	keys.forEach((key) => {
		if (pickFrom.hasOwnProperty(key)) {
			picked[key] = pickFrom[key];
		}
	});
	return picked;
};
