
# recursive-fs

[![npm-version]][npm] [![travis-ci]][travis] [![coveralls-status]][coveralls]


## readdirr

```js
var path = require('path')
var recursive = require('recursive-fs')

var spath = path.resolve(process.cwd(), process.argv[2])

recursive.readdirr(spath, function (err, dirs, files) {
  if (err) {
    console.log(err)
  } else {
    console.log(dirs)
    console.log(files)
    console.log('DONE!')
  }
})
```


## rmdirr

```js
var path = require('path')
var recursive = require('recursive-fs')

var spath = path.resolve(process.cwd(), process.argv[2])

recursive.rmdirr(spath, function (err) {
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

var spath = path.resolve(process.cwd(), process.argv[2])
var tpath = path.resolve(process.cwd(), process.argv[3])

recursive.cpdirr(spath, tpath, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('DONE!')
  }
})
```


# CLI

## recursive-delete
```
npx recursive-delete 'relative/path/to/directory'
```

## recursive-copy
```
npx recursive-copy 'relative/path/to/source/directory' 'relative/path/to/destination/directory'
```

  [npm-version]: https://img.shields.io/npm/v/recursive-fs.svg?style=flat-square (NPM Package Version)
  [travis-ci]: https://img.shields.io/travis/simov/recursive-fs/master.svg?style=flat-square (Build Status - Travis CI)
  [coveralls-status]: https://img.shields.io/coveralls/simov/recursive-fs.svg?style=flat-square (Test Coverage - Coveralls)

  [npm]: https://www.npmjs.com/package/recursive-fs
  [travis]: https://travis-ci.org/simov/recursive-fs
  [coveralls]: https://coveralls.io/github/simov/recursive-fs
