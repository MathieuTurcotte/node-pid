# A pid file manager for Node.js
[![Build Status](https://secure.travis-ci.org/MathieuTurcotte/node-pid.png?branch=master)](http://travis-ci.org/MathieuTurcotte/node-pid)
[![NPM version](https://badge.fury.io/js/npid.png)](http://badge.fury.io/js/npid)

Manage a pid file in Node.js.

## Installation

``` sh
$ npm install npid
```

## Unit tests

``` sh
$ npm test
```

## Usage

This module simply creates and manages a pid file for the entire duration of
the program execution. The pid file is automatically deleted upon normal program
exit. If a pid file already exists, an exception will be thrown.

``` js
var npid = require('npid');

try {
    var pid = npid.create('/var/run/chubaka.pid');
    pid.removeOnExit();
} catch (err) {
    console.log(err);
    process.exit(1);
}
```

Note that the pid file won't be deleted when a program stops due to an uncaught
exception or a signal. This can be avoided by specifying a handler for uncaught
exceptions that calls `process.exit` or remove the pid file explicitly.

## API

### Static functions

#### npid.create(path, [force])

- path: pid file path
- force: overwrite any existing pid file

Synchronously create a pid file and returns a handle to it.

#### npid.remove(path)

- path: pid file path

Synchronously removes a pid file. Does not throw.

### Class Pid

Represents a handle to a pid file and expose an API to remove it either
automatically at process exit or manually when the process exits due to
an uncaught exception or a signal.

#### pid.remove()

Removes the pid file. Does not throw.

#### pid.removeOnExit()

Removes the pid file on normal process exit.

## License

This code is free to use under the terms of the [MIT license](http://mturcotte.mit-license.org/).
