# A pid file manager for Node.js [![Build Status](https://secure.travis-ci.org/MathieuTurcotte/node-pid.png?branch=master)](http://travis-ci.org/MathieuTurcotte/node-pid)

Manage a pid file in Node.js.

## Installation

```
npm install npid
```

## Tests

```
npm test
```

## Usage

This module simply creates and manages a pid file for the entire duration of
the program execution. The pid file is automatically deleted upon normal program
exit. If a pid file already exists, an exception will be thrown.

``` js
var npid = require('npid');

try {
    npid.create('/var/run/chubaka.pid');
} catch (err) {
    console.log(err);
    process.exit(1);
}
```

Note that the pid file won't be deleted when a program stops due to an uncaught
exception. This can be avoided by specifying a handler for uncaught exceptions
that calls `process.exit`.

## API

### npid.create(path, [force])

- path: pid file path
- force: overwrite any existing pid file

Synchronously create a pid file that is going to be deleted on process exit.

## License

This code is free to use under the terms of the [MIT license](http://mturcotte.mit-license.org/).
