#!/usr/bin/env node
'use strict';
// prepackage <dir>
//
// replace all symlinks in a directory with actual content and
// update timestamps of all files and subdirectories, so lambda
// can consume projects working with npm 5 and local file dependencies
//
const fse = require('fs-extra'),
	workingDir = process.argv[2],
	path = require('path'),
	fs = require('fs'),
	run = function () {
		const parentDir = path.dirname(workingDir),
			intermediaryDir = path.join(parentDir, path.basename(workingDir) + '.' + Date.now());
		return fse.copy(workingDir, intermediaryDir, {dereference: true, overwrite: true, preserveTimestamps: false})
		.then(() => fse.remove(workingDir))
		.then(() => fse.move(intermediaryDir, workingDir));
	},
	checkIsDir = (dir) => {
		return new Promise((resolve, reject) => {
			fs.stat(dir, (err, stat) => {
				if (err) {
					return reject(err);
				}
				if (!stat.isDirectory()) {
					return reject('Argument is not a directory: ' + dir);
				}
				resolve();
			});
		});
	},
	validate = function () {
		if (!workingDir) {
			return Promise.reject('Usage: prepackage <target dir>');
		}
		if (path.resolve(workingDir) === path.resolve(process.cwd())) {
			return Promise.reject('Cannot prepackage the current working dir. Execute on a subdir (eg prepackage node_modules)');
		}
		return checkIsDir(workingDir);
	};
return validate()
	.then(run)
	.catch(err => {
		console.error(err.message || err);
		process.exit(1);
	});
