
var t = require('assert').strict
var fs = require('fs')
var path = require('path')
var recursive = require('../')
var fixtures = require('./fixtures')


describe('callback', () => {
  var spath = path.join(__dirname, 'input')
  var tpath = path.join(__dirname, 'output')

  before(() => {
    fs.mkdirSync(spath)
    fixtures.dirs.forEach((fixture) => {
      fs.mkdirSync(path.join(spath, fixture))
    })
    fixtures.files.forEach((fixture) => {
      var fpath = path.join(spath, fixture)
      fs.writeFileSync(fpath, 'data', 'utf8')
    })
  })

  after((done) => {
    recursive.rmdirr(spath, () => {
      recursive.rmdirr(tpath, () => {
        done()
      })
    })
  })

  it('readdirr', (done) => {
    recursive.readdirr(spath, (err, dirs, files) => {
      if (err) return done(err)
      t.equal(dirs.length, fixtures.dirs.length + 1)
      t.equal(files.length, fixtures.files.length)
      done()
    })
  })

  it('cpdirr', (done) => {
    recursive.cpdirr(spath, tpath, (err) => {
      if (err) return done(err)
      recursive.readdirr(tpath, (err, dirs, files) => {
        if (err) return done(err)
        t.equal(dirs.length, fixtures.dirs.length + 1)
        t.equal(files.length, fixtures.files.length)
        done()
      })
    })
  })

  it('copy directories', (done) => {
    recursive.readdirr(spath, (err, dirs, files) => {
      if (err) return done(err)
      recursive.cpdirs(spath, tpath, dirs, (err) => {
        if (err) return done(err)
        recursive.readdirr(tpath, (err, dirs, files) => {
          if (err) return done(err)
          t.equal(dirs.length, fixtures.dirs.length + 1)
          done()
        })
      })
    })
  })
  it('copy files', (done) => {
    recursive.readdirr(spath, (err, dirs, files) => {
      if (err) return done(err)
      recursive.cpfiles(spath, tpath, files, (err) => {
        if (err) return done(err)
        recursive.readdirr(tpath, (err, dirs, files) => {
          if (err) return done(err)
          t.equal(files.length, fixtures.files.length)
          done()
        })
      })
    })
  })

  it('rmdirr', (done) => {
    recursive.rmdirr(tpath, (err) => {
      if (err) return done(err)
      fs.exists(tpath, (exists) => {
        t.equal(exists, false)
        done()
      })
    })
  })

  it('remove files', (done) => {
    recursive.readdirr(spath, (err, dirs, files) => {
      if (err) return done(err)
      recursive.rmfiles(files, (err) => {
        if (err) return done(err)
        recursive.readdirr(spath, (err, dirs, files) => {
          if (err) return done(err)
          t.equal(files.length, 0)
          done()
        })
      })
    })
  })
  it('remove directories', (done) => {
    recursive.readdirr(spath, (err, dirs, files) => {
      if (err) return done(err)
      recursive.rmdirs(dirs, (err) => {
        if (err) return done(err)
        fs.exists(spath, (exists) => {
          t.equal(exists, false)
          done()
        })
      })
    })
  })
})
