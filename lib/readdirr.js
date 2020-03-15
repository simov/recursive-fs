
var fs = require('fs')
var util = require('util')


function readdirr (dpath, done) {
  var dirs = [], files = []
  dirs.push(dpath)
  ;(function walk (_dirs) {
    if (!_dirs.length) return done(null, dirs, files)

    var complete = 0
    var __dirs = []

    for (let dir of _dirs) {
      fs.readdir(dir, {withFileTypes: true}, function (err, _files) {
        if (err) return done(err)

        for (var entry of _files) {
          var fpath = `${dir}/${entry.name}`
          if (entry.isDirectory()) {
            __dirs.push(fpath)
            dirs.push(fpath)
          }
          else {
            files.push(fpath)
          }
        }

        if (++complete === _dirs.length) {
          walk(__dirs)
        }
      })
    }
  }([dpath]))
}

var promisify = (fn) => (...args) => typeof args.slice(-1)[0] === 'function'
  ? fn(...args)
  : new Promise((resolve, reject) =>
    fn(...args, (err, dirs, files) => err ? reject(err) : resolve({dirs, files})))

module.exports = {
  readdirr: promisify(readdirr),
}
