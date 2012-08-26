/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var npid = require('../../index');

var pid = process.argv[2],
    iid = setInterval(function() {}, 5000);

npid.create(pid);

process.on('message', function(m) {
    process.exit(0);
});

process.send('ok');
