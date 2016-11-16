
# recursive-fs

[![npm-version]][npm] [![travis-ci]][travis] [![coveralls-status]][coveralls]


## readdirr

```js
var path = require('path')
var recursive = require('recursive-fs')

var root = path.resolve(process.argv[2])
recursive.readdirr(root, function (err, dirs, files) {
  if (err) {
    console.log(err)
  } else {
    console.log('DONE!')
  }
})
```


## rmdirr

```js
var path = require('path')
var recursive = require('recursive-fs')

var root = path.resolve(process.argv[2])
recursive.rmdirr(root, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('DONE!')
  }
})
```


## cpdirr

```js
var path = require('path')
var recursive = require('recursive-fs')

var spath = path.resolve(process.argv[2]),
  tpath = path.resolve(process.argv[3])
recursive.cpdirr(spath, tpath, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('DONE!')
  }
})
```


  [npm-version]: http://img.shields.io/npm/v/recursive-fs.svg?style=flat-square (NPM Package Version)
  [travis-ci]: https://img.shields.io/travis/simov/recursive-fs/master.svg?style=flat-square (Build Status - Travis CI)
  [coveralls-status]: https://img.shields.io/coveralls/simov/recursive-fs.svg?style=flat-square (Test Coverage - Coveralls)

  [npm]: https://www.npmjs.com/package/recursive-fs
  [travis]: https://travis-ci.org/simov/recursive-fs
  [coveralls]: https://coveralls.io/github/simov/recursive-fs
