#!/usr/bin/env node
'use strict';
//workaround for npm5 incredibly daft decision to work with nested symlinks]
const cp = require('child_process'),
	path = require('path'),
	script = process.argv[2],
	nodeExecutable = process.argv[0],
	executablePath = path.resolve(__dirname, '..', 'node_modules', '.bin', script),
	args = [executablePath].concat(process.argv.slice(3)),
	runCommand = function () {
		const subProcess = cp.spawn(nodeExecutable, args, {cwd: process.cwd(), env: process.env});
		subProcess.stdout.pipe(process.stdout);
		subProcess.stderr.pipe(process.stderr);
		subProcess.on('close', (code) => {
			process.exit(code);
		});
		subProcess.on('error', (err) => {
			console.error('error starting subprocess', err);
			process.exit(1);
		});
	};

runCommand();

