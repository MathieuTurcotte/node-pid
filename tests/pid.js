/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var fs = require('fs'),
    path = require('path');

var npid = require('../lib/pid');

var SANDBOX_PATH = path.join(__dirname, 'sandbox'),
    NEW_PID_FILE = path.join(SANDBOX_PATH, 'pid0'),
    EXISTING_PID_FILE = path.join(SANDBOX_PATH, 'pid1');

function rmdirSync(p) {
    var stat;

    try {
        stat = fs.lstatSync(p);
    } catch (err) {
        if (err.code === "ENOENT") {
            return;
        } else {
            throw err;
        }
    }

    if (!stat.isDirectory()) {
        fs.unlinkSync(p);
    } else {
        fs.readdirSync(p).forEach(function (f) {
            rmdirSync(path.join(p, f));
        });

        fs.rmdirSync(p);
    }
}


exports["npid"] = {
    setUp: function(callback) {
        rmdirSync(SANDBOX_PATH);
        fs.mkdirSync(SANDBOX_PATH);
        fs.writeFileSync(EXISTING_PID_FILE, '1234');
        callback();
    },

    "pid files should contain the process id": function(test) {
        npid.create(NEW_PID_FILE);
        var pid = fs.readFileSync(NEW_PID_FILE, 'utf8');
        test.equal(pid, process.pid);
        test.done();
    },

    "an existing pid file should not be overwritten": function(test) {
        test.throws(function() {
            npid.create(EXISTING_PID_FILE);
        }, npid.PidFileExists);
        test.done();
    },

    "content of an existing pid file should not be overwritten": function(test) {
        var originalContent = fs.readFileSync(EXISTING_PID_FILE, 'utf8');

        try {
            npid.create(EXISTING_PID_FILE);
        } catch (err) {}

        var finalContent = fs.readFileSync(EXISTING_PID_FILE, 'utf8');

        test.equal(originalContent, finalContent);
        test.done();
    },

    "when force is true, content of the existing pid file should be overwritten": function(test) {
        var original = fs.readFileSync(EXISTING_PID_FILE, 'utf8');
        npid.create(EXISTING_PID_FILE, true);
        var final = fs.readFileSync(EXISTING_PID_FILE, 'utf8');
        test.notEqual(original, final);
        test.done();
    }
};
