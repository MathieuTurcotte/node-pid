#!/usr/bin/env node

var pid = require('./pid');

pid.create('./example.pid');

setInterval(function() {
    /* ... */
}, 5000);
