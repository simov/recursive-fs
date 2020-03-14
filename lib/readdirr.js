
var fs = require('fs')


/**
 * Read directory recursively
 *
 * @param {String} directory path
 * @param {Function} callback
 * @return {Arrays} dirs & files
 * @api public
 */

exports.readdirr = function (dpath, done) {
  var dirs = [], files = []
  dirs.push(dpath)
  ;(function walk (_dirs) {
    if (!_dirs.length) {
      done(null, dirs, files)
      return
    }

    var complete = 0
    var __dirs = []

    for (let dir of _dirs) {
      fs.readdir(dir, {withFileTypes: true}, function (err, _files) {
        if (err) {
          done(err)
          return
        }

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
