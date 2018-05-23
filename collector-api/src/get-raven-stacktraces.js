'use strict';

module.exports = function getRavenStacktraces(exception) {
	return exception && exception.stacktrace && Array.isArray(exception.stacktrace.frames) &&
		exception.stacktrace.frames.map(err => {
			return `\t at ${err.function} (${err.filename}:${err.lineno})`;
		}).reverse().concat([`${exception.type} ${exception.value}`]).join('\n');
};
