/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var fs = require('fs');

/**
 * Write a pid file synchronously.
 *
 * @param path File's path.
 * @param force Boolean indicating whether the pid file
 * should be overwritten in case it already exists.
 */
function writePid(path, force) {
    var pid = new Buffer(process.pid + '\n'),
        fd = fs.openSync(path, force ? 'w' : 'wx'),
        offset = 0;

    while (offset < pid.length) {
        offset += fs.writeSync(fd, pid, offset, pid.length - offset);
    }

    fs.closeSync(fd);
}

/**
 * Create a pid file synchronously.
 *
 * @param path File's path.
 * @param force Boolean indicating whether the pid file
 * should be overwritten in case it already exists.
 */
module.exports.create = function(path, force) {
    writePid(path, force);

    process.on('exit', function() {
        try {
            fs.unlinkSync(path);
        } catch (err) {}
    });
};

