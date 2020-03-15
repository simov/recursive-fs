
var fs = require('fs')
var path = require('path')
var readdirr = require('./readdirr').readdirr


function cpdirr (spath, tpath, done) {
  readdirr(spath, function (err, dirs, files) {
    if (err) return done(err)
    cpdirs(spath, tpath, dirs, function (err) {
      if (err) return done(err)
      cpfiles(spath, tpath, files, done)
    })
  })
}

function cpdirs (spath, tpath, dirs, done) {
  dirs.sort()
  ;(function walk (index) {
    if (index == dirs.length) return done()
    var rpath = path.relative(spath, dirs[index])
    rpath = path.join(tpath, rpath)
    fs.exists(rpath, function (exists) {
      if (exists) return walk(++index)
      fs.mkdir(rpath, function (err) {
        if (err) return done(err)
        walk(++index)
      })
    })
  }(0))
}

function cpfiles (spath, tpath, files, done) {
  ;(function walk (index) {
    if (index == files.length) return done()
    fs.readFile(files[index], function (err, data) {
      if (err) return done(err)
      var rpath = path.relative(spath, files[index])
      rpath = path.join(tpath, rpath)
      fs.writeFile(rpath, data, function (err) {
        if (err) return done(err)
        walk(++index)
      })
    })
  }(0))
}

var promisify = (fn) => (...args) => typeof args.slice(-1)[0] === 'function'
  ? fn(...args)
  : new Promise((resolve, reject) =>
    fn(...args, (err) => err ? reject(err) : resolve()))

module.exports = {
  cpdirr: promisify(cpdirr),
  cpdirs: promisify(cpdirs),
  cpfiles: promisify(cpfiles),
}
