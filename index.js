/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

function exit() {
    process.nextTick(function() {
        process.exit(0);
    });
}

process.on('SIGINT', exit);
process.on('SIGTERM', exit);

module.exports = require('./lib/pid.js');

