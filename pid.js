/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var fs = require('fs');

module.exports.create = function(filename) {
    var pid = process.pid + '\n';
    fs.writeFileSync(filename, pid);

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
        fs.unlinkSync(filename);
    });
};

