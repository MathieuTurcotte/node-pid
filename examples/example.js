#!/usr/bin/env node

var pid = require('../lib/pid');

pid.create('./example.pid');

setInterval(function() {
    /* ... */
}, 5000);
