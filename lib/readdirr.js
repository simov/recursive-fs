
var fs = require('fs')


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

module.exports = {readdirr}
