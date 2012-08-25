#!/usr/bin/env node

var pid = require('../lib/pid');

pid.create('./exception.pid');

throw new Error('Boum!');
