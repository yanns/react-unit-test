react-unit-test
===============

Sample configuration to unit test a [ReactJS](http://facebook.github.io/react/) application.

The unit tests run in nodejs, without any browser.


The build is based on:
  - [nodejs](http://nodejs.org/) / [npm](https://www.npmjs.org/)
  - [gulp](https://github.com/gulpjs/gulp)
  - [mocha](http://visionmedia.github.io/mocha/), for unit tests
  - [jsdom](https://github.com/tmpvar/jsdom), for testing DOM


### install node modules
```
npm install -D
```

### only test

```
./node_modules/.bin/gulp test
```