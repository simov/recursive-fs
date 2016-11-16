
var t = require('assert')
var fs = require('fs')
var path = require('path')
var recursive = require('../')
var fixtures = require('./fixtures')


describe('recursive', function () {
  var spath = path.join(__dirname, 'input')
  var tpath = path.join(__dirname, 'output')

  before(function () {
    fs.mkdirSync(spath)
    fixtures.dirs.forEach(function (fixture) {
      fs.mkdirSync(path.join(spath, fixture))
    })
    fixtures.files.forEach(function (fixture) {
      var fpath = path.join(spath, fixture)
      fs.writeFileSync(fpath, 'data', 'utf8')
    })
  })

  describe('read', function () {
    it('directory', function (done) {
      recursive.readdirr(spath, function (err, dirs, files) {
        if (err) return done(err)
        t.equal(dirs.length, fixtures.dirs.length + 1)
        t.equal(files.length, fixtures.files.length)
        done()
      })
    })
  })

  describe('copy', function () {
    it('directory', function (done) {
      recursive.cpdirr(spath, tpath, function (err) {
        if (err) return done(err)
        recursive.readdirr(tpath, function (err, dirs, files) {
          if (err) return done(err)
          t.equal(dirs.length, fixtures.dirs.length + 1)
          t.equal(files.length, fixtures.files.length)
          done()
        })
      })
    })
    after(function (done) {
      recursive.rmdirr(tpath, function (err) {
        if (err) return done(err)
        done()
      })
    })
  })

  describe('copy', function () {
    it('list of directories', function (done) {
      recursive.readdirr(spath, function (err, dirs, files) {
        if (err) return done(err)
        recursive.cpdirs(spath, tpath, dirs, function (err) {
          if (err) return done(err)
          recursive.readdirr(tpath, function (err, dirs, files) {
            if (err) return done(err)
            t.equal(dirs.length, fixtures.dirs.length + 1)
            done()
          })
        })
      })
    })
    it('list of files', function (done) {
      recursive.readdirr(spath, function (err, dirs, files) {
        if (err) return done(err)
        recursive.cpfiles(spath, tpath, files, function (err) {
          if (err) return done(err)
          recursive.readdirr(tpath, function (err, dirs, files) {
            if (err) return done(err)
            t.equal(files.length, fixtures.files.length)
            done()
          })
        })
      })
    })
  })

  describe('remove', function () {
    it('directory', function (done) {
      recursive.rmdirr(tpath, function (err) {
        if (err) return done(err)
        fs.exists(tpath, function (exists) {
          t.equal(exists, false)
          done()
        })
      })
    })
  })

  describe('remove', function () {
    it('list of files', function (done) {
      recursive.readdirr(spath, function (err, dirs, files) {
        if (err) return done(err)
        recursive.rmfiles(files, function (err) {
          if (err) return done(err)
          recursive.readdirr(spath, function (err, dirs, files) {
            if (err) return done(err)
            t.equal(files.length, 0)
            done()
          })
        })
      })
    })
    it('list of directories', function (done) {
      recursive.readdirr(spath, function (err, dirs, files) {
        if (err) return done(err)
        recursive.rmdirs(dirs, function (err) {
          if (err) return done(err)
          fs.exists(spath, function (exists) {
            t.equal(exists, false)
            done()
          })
        })
      })
    })
  })
})
