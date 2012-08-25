/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var fs = require('fs'),
    util = require('util');

/**
 * Custom error used to signal that a pid file already exists.
 */
function PidFileExists(path) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    this.path = path;
    this.name = this.constructor.name;
    this.message = 'PID file already exists "' + path + '"';
}
util.inherits(PidFileExists, Error);

/**
 * Create a pid file synchronously.
 *
 * @param path Pidfile's path.
 * @param force Boolean indicating if the pid file
 * should be overwritten in case it already exists.
 */
module.exports.create = function(path, force) {
    var pid = new Buffer(process.pid + '\n');

    try {
        var fd = fs.openSync(path, force ? 'w' : 'wx');

        var written = 0,
            offset = 0;

        while (offset < pid.length) {
            offset += fs.writeSync(fd, pid, offset, pid.length - offset);
        }

        fs.closeSync(fd);

    } catch (err) {
        if (err.code == 'EEXIST') {
            throw new PidFileExists(path);
        } else {
            throw err;
        }
    }

    process.on('SIGINT', function() {
        process.nextTick(function() {
            process.exit(0);
        });
    });

    process.on('SIGTERM', function() {
        process.nextTick(function() {
            process.exit(0);
        });
    });

    process.on('exit', function() {
        try {
            fs.unlinkSync(path);
        } catch (err) {}
    });
};

module.exports.PidFileExists = PidFileExists;
