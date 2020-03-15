
var t = require('assert').strict
var fs = require('fs')
var path = require('path')
var rfs = require('../')
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
    rfs.rmdirr(spath, () => {
      rfs.rmdirr(tpath, () => {
        done()
      })
    })
  })

  it('readdirr', (done) => {
    rfs.readdirr(spath, (err, dirs, files) => {
      if (err) return done(err)
      t.equal(dirs.length, fixtures.dirs.length + 1)
      t.equal(files.length, fixtures.files.length)
      done()
    })
  })

  it('cpdirr', (done) => {
    rfs.cpdirr(spath, tpath, (err) => {
      if (err) return done(err)
      rfs.readdirr(tpath, (err, dirs, files) => {
        if (err) return done(err)
        t.equal(dirs.length, fixtures.dirs.length + 1)
        t.equal(files.length, fixtures.files.length)
        done()
      })
    })
  })

  it('copy directories', (done) => {
    rfs.readdirr(spath, (err, dirs, files) => {
      if (err) return done(err)
      rfs.cpdirs(spath, tpath, dirs, (err) => {
        if (err) return done(err)
        rfs.readdirr(tpath, (err, dirs, files) => {
          if (err) return done(err)
          t.equal(dirs.length, fixtures.dirs.length + 1)
          done()
        })
      })
    })
  })
  it('copy files', (done) => {
    rfs.readdirr(spath, (err, dirs, files) => {
      if (err) return done(err)
      rfs.cpfiles(spath, tpath, files, (err) => {
        if (err) return done(err)
        rfs.readdirr(tpath, (err, dirs, files) => {
          if (err) return done(err)
          t.equal(files.length, fixtures.files.length)
          done()
        })
      })
    })
  })

  it('rmdirr', (done) => {
    rfs.rmdirr(tpath, (err) => {
      if (err) return done(err)
      fs.exists(tpath, (exists) => {
        t.equal(exists, false)
        done()
      })
    })
  })

  it('remove files', (done) => {
    rfs.readdirr(spath, (err, dirs, files) => {
      if (err) return done(err)
      rfs.rmfiles(files, (err) => {
        if (err) return done(err)
        rfs.readdirr(spath, (err, dirs, files) => {
          if (err) return done(err)
          t.equal(files.length, 0)
          done()
        })
      })
    })
  })
  it('remove directories', (done) => {
    rfs.readdirr(spath, (err, dirs, files) => {
      if (err) return done(err)
      rfs.rmdirs(dirs, (err) => {
        if (err) return done(err)
        fs.exists(spath, (exists) => {
          t.equal(exists, false)
          done()
        })
      })
    })
  })
})
