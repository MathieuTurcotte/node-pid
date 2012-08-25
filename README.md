# PID file for Node.js

Manage a PID file in Node.js.

## Installation

```
npm install npid
```

## Unit tests

```
npm test
```

## Usage

``` js
var npid = require('npid');

try {
    npid.create('/var/run/chubaka.pid');
} catch (err) {
    console.log(err);
    process.exit(1);
}
```

## API

### npid.create(path, [force])

- path: pid file path
- force: overwrite any existing pid file

Synchronously create a PID file that is going to be deleted on process exit.

## License

This code is free to use under the terms of the [MIT license](http://mturcotte.mit-license.org/).
